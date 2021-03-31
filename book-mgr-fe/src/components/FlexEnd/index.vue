<template>
    <div class="flex-end">
        <!-- slot是插槽 -->
        <slot />
    </div>
</template>

<style lang="scss" scoped>
    .flex-end{
        display: flex;
        justify-content: flex-end;
    }
</style>