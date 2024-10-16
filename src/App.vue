<script setup lang="ts">
import { NThemeEditor } from "naive-ui";
</script>

<template>
  <NThemeEditor>
    <NaiveTheme>
      <NLoadingBarProvider>
        <NMessageProvider>
          <NDialogProvider>
            <NaiveUiApi></NaiveUiApi>
          </NDialogProvider>
        </NMessageProvider>
      </NLoadingBarProvider>

      <RouterView></RouterView>
    </NaiveTheme>
  </NThemeEditor>
</template>

<style scoped></style>
