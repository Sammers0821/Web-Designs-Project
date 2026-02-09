<script setup>
const props = defineProps({
    title: {
      type: String,
      default: 'Section'  
    }
})
</script>

<template>
    <section>
        <h3>{{title}}</h3>
        <slot></slot>>
    </section>
</template>

<style scoped>
section {
    margin-top: 16px;
}

section h3 {
    margin: 0 0 6px;
    font-size: 14px;
    color: #25d6b9;
}
</style>