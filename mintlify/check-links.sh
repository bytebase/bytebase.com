#!/bin/bash

# Change to the mintlify directory
cd "$(dirname "$0")"

# Run mint broken-links and capture output
echo "Checking for broken links in mintlify directory..."
output=$(mint broken-links 2>&1)

# Check if mint command failed completely
if [ $? -ne 0 ] && [ -z "$output" ]; then
    echo "Error: Failed to run 'mint broken-links' command"
    exit 1
fi

# Check if no broken links were found at all
if echo "$output" | grep -q "No broken links found"; then
    echo "✅ No broken links found"
    exit 0
fi

# Process the output to filter out api-reference links
# First, let's identify files that ONLY have api-reference links
has_non_api_links=false
current_file=""
file_has_non_api_links=false
filtered_lines=""

while IFS= read -r line; do
    # Check if this is a file name line (ends with .mdx or .md)
    if echo "$line" | grep -qE '\.(mdx?|md)$'; then
        # If we had a previous file with non-api links, add it to output
        if [ -n "$current_file" ] && [ "$file_has_non_api_links" = true ]; then
            filtered_lines="${filtered_lines}${current_file}\n"
        fi
        current_file="$line"
        file_has_non_api_links=false
    # Check if this is a link line (contains ⎿ or →)
    elif echo "$line" | grep -qE '⎿|→'; then
        # Check if this link is NOT an api-reference link
        if ! echo "$line" | grep -q "/api-reference"; then
            file_has_non_api_links=true
            has_non_api_links=true
            filtered_lines="${filtered_lines}${line}\n"
        fi
    # Keep the summary line only if we have non-api links
    elif echo "$line" | grep -q "found.*broken links"; then
        continue  # Skip for now, we'll add our own summary
    fi
done <<< "$output"

# Add the last file if it had non-api links
if [ -n "$current_file" ] && [ "$file_has_non_api_links" = true ]; then
    filtered_lines="${filtered_lines}${current_file}\n"
fi

# Output results
if [ "$has_non_api_links" = true ]; then
    echo "❌ Broken links found (excluding /api-reference):"
    echo ""
    printf "$filtered_lines"
    
    # Count the actual broken links
    link_count=$(printf "$filtered_lines" | grep -c "⎿\|→" || echo "0")
    if [ $link_count -gt 0 ]; then
        echo ""
        echo "Total broken links (excluding /api-reference): $link_count"
    fi
    exit 1
else
    echo "✅ No broken links found (excluding /api-reference)"
    exit 0
fi