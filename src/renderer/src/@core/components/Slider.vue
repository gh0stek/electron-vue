<script lang="ts" setup generic="T extends SliderItem">
import { iconsList } from '@/constants/iconsList'

export type SliderItem = {
  id: string | number
}

defineProps<{
  items: T[]
}>()
</script>

<template>
  <div>
    <div class="d-flex align-center flex-wrap">
      <VCard v-for="item in items" :key="item.id" class="mb-6 me-6">
        <slot :item="item" />
        <!-- <VCardText class="py-3 px-4">
          <VIcon size="30" :icon="icon" />
        </VCardText>

        <VTooltip location="top" activator="parent">
          {{ icon }}
        </VTooltip> -->
      </VCard>
    </div>

    <!-- more icons -->
    <div class="text-center">
      <VBtn
        href="https://materialdesignicons.com/"
        rel="noopener noreferrer"
        color="primary"
        target="_blank"
      >
        next
      </VBtn>
    </div>
  </div>
</template>
