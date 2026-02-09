<template>
    <main class="card">
     <slot />
    </main>
</template>

<style scoped>
.card {
    width: min(600 px, 100%);
    background: #fff;
    padding: 18px;
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(79, 70, 229, .2);
}
</style>