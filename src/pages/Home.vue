<script setup>
import AppLayout from '../components/AppLayout.vue';
import CocktailThumb from '../components/CocktailThumb.vue'
import { useRootStore } from '../stores/root'
import { storeToRefs } from 'pinia';


const rootStore = useRootStore();
rootStore.getIngredients();

const { ingredients, cocktails, ingredient } = storeToRefs(rootStore);


function getCocktails() {
    rootStore.getCocktails(rootStore.ingredient);
}

function removeIngredient() {
    rootStore.setIngredient(null);
}

</script>

<template>
    <div v-auto-animate>
<AppLayout imgUrl="/img/00.png" 
            :backFunc="removeIngredient"
            :is-back-button-visible="!!ingredient"
            >
    <div class="wrapper" >
       <div v-if="!ingredient || !cocktails" class="info" >
        <div class="title">Choose your drink</div>
        <div class="line"></div>

        <div class="select-wrapper"> 
            <el-select 
                v-model="rootStore.ingredient" 
                placeholder="Choose main ingredient" 
                size="large"
                filterable  
                allow-create
                class="select"
                @change="getCocktails"
                >
                <el-option
                    v-for="item in ingredients"
                    :key="item.strIngredient1"
                    :label="item.strIngredient1"
                    :value="item.strIngredient1"
                />
            </el-select>
        </div>
        <div class="text">
            Try our delicious cocktail recipes for every occasion. Find delicious cocktail recipes by ingredient through our cocktail generator.
        </div>
        <img src="/img/001.png" class="img" alt="cocktails">
       </div>

       <div v-else class="info">
        <div class="title">COCKTAILS WITH {{ ingredient }} </div>
        <div class="line"></div>
        <div class="cocktails">
            <div class="cocktails__body" v-auto-animate>
                <CocktailThumb 
                v-for="cocktail in cocktails"
                :key="cocktail.idDrink"
                :cocktail="cocktail"
            />
            </div>
        </div>
       </div>
    </div>
</AppLayout>
</div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import '../assets/styles/main';
.wrapper {
    display: flex;  
    align-items: center ; 
    justify-content: center;
}
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include adaptiveValue("padding-top", 80, 40, 2, 768, 320);
    @include adaptiveValue("padding-bottom", 80, 40, 2, 768, 320);
}
.select-wrapper {
    padding: 50px 0;
    }

.select {
    width: 220px ;
    margin: 0 auto;
}
.text  {
    @include adaptiveValue("font-size", 16, 14);
    line-height: math.div(36 , 16);
    line-height: 36px;
    max-width: 515px;
    margin: 0 auto;
    letter-spacing: .1em;
    color: $textMuted;
    text-align: center;
}
.img {
    @include adaptiveValue("padding-top", 60, 40, 2, 768, 320);
    max-width: 345px;
    @media (max-width: 350px) {
        width: 100%; 
    }
    img {
        width: 100%;
    }
}
$tablet: em(991.98);
.cocktails {
    max-height: 400px;
    margin: 60px;
    overflow-y: auto;
    &__body {
        display: flex;
        flex-wrap: wrap; 
        justify-content: space-around;
        gap: 25px; 
        width: 100%;
    }
    @media (max-width:$tablet){
        margin: toRem(60) toRem(0) toRem(60) toRem(0);
        margin-left: 0;
    }
}
</style>
