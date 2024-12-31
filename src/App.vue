<script setup lang="ts"></script>

<template>
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
</template>

<style scoped></style>
