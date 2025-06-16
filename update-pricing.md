take `Online Schema Change` in `feature-new.txt` for example,

----
we can find it in `feature-new.txt`

| Online Schema Change | ✅ | ✅ | ✅ |

----

Then we will take a look at `pricing-plans.ts`

we can find it in `pricing-plans.ts`

L 270: `online-schema-change`: 'Online schema change', which is the title of the feature

 L 26: `online-schema-change`: false, which included in `free` plan

 L 102: `online-schema-change`: true, which included in `pro` plan

 L 187: `online-schema-change`: true, which included in `enterprise` plan

----

so according to `feature-new.txt`, we need to update `pricing-plans.ts`

L 26: `online-schema-change`: true to make it available in `free` plan

----

If we can't add it in pricing-plans.ts, we should first add it or update the feature name in `pricing-plans.ts`