<script setup>
import axios from 'axios';
import { computed, ref } from 'vue';
import { register } from 'swiper/element';
import {  Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import "swiper/css/pagination";
import 'swiper/css/navigation';
import 'swiper/css';
import { COCKTAIL_RANDOM, COCKTAIL_PIC } from '@/constants';
import AppLayout from '../components/AppLayout.vue';


register(Pagination, Navigation);

const onSwiper = (swiper) => console.log(swiper);
const onSlideChange = () => console.log('slide change');
const modules = [ Pagination, Navigation ];
//=============================================================================================
const cocktail = ref(null);
const ingredients = computed(() => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        if (!cocktail.value[`strIngredient${i}`]) break;
        const ingredient = cocktail.value[`strIngredient${i}`];
        ingredients.push(ingredient);
    }
    return ingredients;
});

async function getCocktail() {
    const data  = await axios.get(COCKTAIL_RANDOM);
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
                    <div class="slider">
                        <swiper
                            :slides-per-view="3"
                            :space-between="50"
                            :loop="true"
                            class="swiper"
                            v-auto-animate
                            :breakpoints="{ 
                                320:{ slidesPerView:1 }, 
                                350:{ slidesPerView:2 },
                                480:{ slidesPerView:3 },
                                768:{ slidesPerView:2 },
                                900:{ slidesPerView:3 }
                                  }"
                            :navigation="true"
                            :modules="modules"
                            :pagination="{ clickable: true }"  
                            @swiper="onSwiper"
                            @slideChange="onSlideChange"    
                        >
                            <swiper-slide
                                v-for="(ingredient, key) in ingredients"
                                :key="key"
                                class="swiper-item"
                                >
                                <img :src="`${COCKTAIL_PIC}${ingredient}-Small.png`" />
                                <div class="name">{{ ingredient }}</div>

                            </swiper-slide>
                            
                            
                        </swiper>
                        
                    </div>
                    
                    <div class="instructions">{{ cocktail.strInstructions }}</div>
                </div>
        
            </div>
        </AppLayout>
    </div>

</template>

<style lang="scss" scoped>
@import '../assets/styles/main';


.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include adaptiveValue("padding-top", 80, 20, 2, 768, 320);
    @include adaptiveValue("padding-bottom", 80, 20, 2, 768, 320);
}
.slider {
    padding: 50px 0;
    width: 100%;
}
.swiper {
    position: relative;
    padding-bottom: 30px;
    @media (max-width:1175px){
        width: 100%;
        
    }
}


.swiper-item {
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.name {
    text-align: center;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>