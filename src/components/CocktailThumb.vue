<script setup>
const props = defineProps({
    cocktail: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <div class="root">
        <RouterLink :to="`/cocktails/${cocktail.idDrink}`">
      <div
        :style="`background-image: url(${cocktail.strDrinkThumb})`"
        class="pic"
        ></div> 
        </RouterLink>
      <div class="name">{{ cocktail.strDrink }}</div> 
    </div>

  
</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.root {
    //width: calc( (100% - 76px) / 3);
    padding-bottom: 15px;
    max-width: 120px;
    

    &:nth-child(3n + 3) {
       padding-right: 0;  
    }
           
}

.pic {
    width: 120px;
    height: 120px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin: 0 auto;
    background-size: 100%;
}
.name {
    padding-top: 7px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 1px;
}  

</style>
