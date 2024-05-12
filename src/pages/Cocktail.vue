<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { COCTAILS_BY_ID } from '@/constants';
import AppLayout from '../components/AppLayout.vue';

const route = useRoute();
const router = useRouter();

const cocktail = ref(null);
const cocktailId = computed(() => route.path.split('/').pop());

const ingredients = computed(() => {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
        if (!cocktail.value[`strIngredient${i}`]) break;

        const ingredient = {};
        ingredient.name = cocktail.value[`strIngredient${i}`];
        ingredient.measure = cocktail.value[`strMeasure${i}`];

        ingredients.push(ingredient);
    }

    return ingredients;
});

async function getCocktail() {
    const data  = await axios.get(`${COCTAILS_BY_ID}${cocktailId.value}`);
    cocktail.value = data?.data?.drinks[0];
}
getCocktail();
</script>

<template>
    <div v-if="cocktail" class="wrap"  v-auto-animate>
        <AppLayout :imgUrl="cocktail.strDrinkThumb">
            <div class="wrapper" >
                <div class="info">
                    <div class="title">{{ cocktail.strDrink }}</div>
                    <div class="line"></div> 
                    <div class="list" v-auto-animate>
                        <div
                            v-for="(item, key) in ingredients"
                            :key="key"
                            class="list-item"
                            >
                            {{ item.name }} 
                            <template v-if="item.measure">
                           |  {{ item.measure }}
                            </template>
                        </div>
                    </div>  
                    <div class="instructions">{{ cocktail.strInstructions }}</div>
                </div>
        
            </div>
        </AppLayout>
    </div>

</template>

<style lang="scss" scoped>
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
    //padding: 80px 0;
    @include adaptiveValue("padding-top", 80, 20, 2, 768, 320);
    @include adaptiveValue("padding-bottom", 80, 20, 2, 768, 320);
}

</style>