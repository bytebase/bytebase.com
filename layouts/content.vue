<template>
  <div class="page-wrapper w-full h-screen">
    <header
      class="w-full h-14 bg-white flex flex-row justify-between items-center py-2 px-4 sm:px-6 border-b"
    >
      <nav
        class="flex flex-row relative justify-start items-center h-full sm:justify-center"
        aria-label="Global"
      >
        <span class="sr-only">Bytebase</span>
        <nuxt-link
          :to="localePath('/')"
          class="header-link"
          @click.native="track('docs.header')"
          ><img class="h-6 sm:h-8 w-auto" src="~/assets/logo-icon.svg" alt=""
        /></nuxt-link>
        <a
          :href="localePath('/docs/cli/overview')"
          class="header-link"
          @click="track('cli.header')"
          >CLI</a
        >
        <a
          :href="localePath('/docs/api/overview')"
          class="header-link"
          @click="track('api.header')"
          >API</a
        >
        <a
          :href="localePath('/docs/how-to/workflow/gitops-feature-branch')"
          class="header-link"
          @click="track('database-how-to.header')"
          >How-To</a
        >
        <nuxt-link
          to="/blog"
          class="header-link hidden sm:block"
          @click.native="track('blog.header')"
          >Blog</nuxt-link
        >
        <nuxt-link
          :to="localePath('/changelog')"
          class="header-link hidden sm:block"
          @click.native="track('changelog.header')"
          >Changelog</nuxt-link
        >
        <nuxt-link
          :to="localePath('/pricing')"
          class="header-link hidden sm:block"
          @click.native="track('pricing.header')"
          >Pricing</nuxt-link
        >
      </nav>
      <div class="flex flex-row justify-start items-center">
        <img
          v-if="state.isMobileView"
          class="h-5 w-auto opacity-60 cursor-pointer"
          src="~/assets/svg/menu.svg"
          alt="menu"
          @click="toggleSidebar"
        />
        <div v-else class="transition-all flex flex-row">
          <a
            href="https://demo.bytebase.com?ref=bytebase.com"
            target="_blank"
            class="ml-2 hidden sm:flex items-center justify-center whitespace-nowrap px-3 h-8 border border-transparent text-sm font-medium rounded border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-300"
            @click="track('demo.header')"
          >
            {{ $t("common.live-demo") }}
          </a>
          <nuxt-link
            :to="localePath('/docs/get-started/install/deploy-with-docker')"
            class="ml-2 hidden sm:flex items-center justify-center whitespace-nowrap px-3 h-8 text-sm font-medium rounded text-white bg-green-500 hover:bg-green-600"
            @click.native="track('deploy.header')"
            >{{ $t("common.deploy-now") }}</nuxt-link
          >
        </div>
        <div id="algolia-search-container" class="ml-2"></div>
      </div>
    </header>
    <main
      class="main-wrapper w-full h-auto flex-grow overflow-y-auto overflow-x-hidden"
    >
      <DocsSidebar
        v-show="state.showSidebar"
        @link-click="handleSidebarClick"
      />
      <Nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import {
  useRoute,
  defineComponent,
  onMounted,
  reactive,
  useContext,
  watchEffect,
} from "@nuxtjs/composition-api";
import Plausible from "plausible-tracker";
import { useCookie } from "../plugin/cookie";
import { useSegment } from "~/plugin/segment";

const { trackEvent } = Plausible();

interface State {
  isMobileView: boolean;
  showSidebar: boolean;
}

// From tailwind, `sm` width is 640.
const MOBILE_VIEW_MAX_WIDTH = 640;

export default defineComponent({
  setup() {
    const route = useRoute();

    const { $ga } = useContext() as any;
    const state = reactive<State>({
      isMobileView: false,
      showSidebar: true,
    });

    onMounted(async () => {
      useCookie().setURLParams();

      watchEffect(() => {
        useSegment().analytics?.page(route.value.name);
      });

      (window as any).docsearch({
        container: "div#algolia-search-container",
        appId: "2M7XI1QIDY",
        indexName: "bytebase-docs",
        apiKey: "405fc756e17b8346cee6b0f969b67249",
      });

      state.isMobileView = window.innerWidth <= MOBILE_VIEW_MAX_WIDTH;
      if (state.isMobileView) {
        state.showSidebar = false;
      } else {
        state.showSidebar = true;
      }
      window.addEventListener("resize", () => {
        const isMobileView = window.innerWidth <= MOBILE_VIEW_MAX_WIDTH;
        if (isMobileView != state.isMobileView) {
          state.isMobileView = window.innerWidth <= MOBILE_VIEW_MAX_WIDTH;
          if (state.isMobileView) {
            state.showSidebar = false;
          } else {
            state.showSidebar = true;
          }
        }
      });
    });

    const track = (name: string) => {
      trackEvent(name);

      const parts = name.split(".");
      $ga.event({
        eventCategory: parts[0],
        eventLabel: parts[1],
      });
    };

    const toggleSidebar = () => {
      state.showSidebar = !state.showSidebar;
    };

    const handleSidebarClick = () => {
      if (state.isMobileView) {
        state.showSidebar = false;
      }
    };

    return {
      state,
      track,
      toggleSidebar,
      handleSidebarClick,
    };
  },
});
</script>

<style scoped>
.page-wrapper {
  @apply grid;
  grid-template-rows:
    minmax(min-content, max-content)
    auto;
}
.main-wrapper {
  grid-template-columns: 280px auto;
  @apply flex sm:grid;
}
.header-link {
  @apply text-gray-700 mr-4 hover:opacity-80 hover:underline whitespace-nowrap;
}
.router-active-link {
  @apply no-underline;
}
</style>

<style>
#algolia-search-container > button {
  @apply ml-0;
}

.DocSearch-Modal .DocSearch-NoResults > .DocSearch-Screen-Icon > svg {
  @apply m-auto;
}

.DocSearch-Button-Container > .DocSearch-Button-Placeholder {
  @apply font-normal;
}
.DocSearch-Button-Container > .DocSearch-Search-Icon {
  @apply w-4 h-auto mx-0.5 sm:ml-1;
}
</style>
