<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Back } from '@element-plus/icons-vue';
import { ROUTES_PATH, COCKTAIL_RANDOM } from '@/constants';
const props = defineProps({
    imgUrl: {
       type: String,
       required: true, 
    },
    backFunc: {
        type: Function,
    },
    isBackButtonVisible: {
        type: Boolean,
        default: true,
    }
})

const route = useRoute();
const router = useRouter();
const routName = computed(() => route.name);

function goForCocktailRandom() {
    router.push({name: ROUTES_PATH.COCKTAIL_RANDOM});

    if (routName.value === ROUTES_PATH.COCKTAIL_RANDOM) {
        router.go();
    }
}

// function goForCocktailRandom() {
//     fetch(COCKTAIL_RANDOM)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error('Network response was not ok.');
//         })
//         .then(data => {
//             // Обрабатываем полученные данные
//             console.log(data);
//         })
//         .catch(error => {
//             // Обрабатываем ошибки
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }



function goBack() {
    props.backFunc ? props.backFunc() : router.go(-1);
}
</script>

<template>
    <div class="root" >
        <div :style="`background-image: url(${imgUrl})`" class="img"></div>
        <div class="main" >
            <div class="btns">
                <el-button 
                    v-if="isBackButtonVisible"
                    @click="goBack" 
                    class="btn-back" 
                    type="primary" 
                    :icon="Back" 
                    circle
                    >
                </el-button>
                <el-button class="btn"
                    @click="goForCocktailRandom">
                    Get random cocktail
                </el-button>
                
            </div>
            

            <slot></slot>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@import '../assets/styles/main';

.root { 
    display: flex; 
    background-color: $bg;
    min-height: 100vh;
    @media (max-width:767.98px){
        flex-direction: column; 
        align-items: center;
    }
}
.img {
    width: 50%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
    object-fit: cover;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media (max-width:767.98px){
        height: 50vh; 
        width: 70%;
        background-position: 0% 20%;
    }
    @media (max-width: 350px) {
        width: 100%; 
    }
}
.main {
    position: relative;
    width: 50%;
    padding: 32px 40px;
    @media (max-width:767.98px){
        width: 100%;
        @include adaptiveValue("padding-right", 40, 15, 2, 768, 320);
        @include adaptiveValue("padding-left", 40, 15, 2, 768, 320);
    }
   }
.btn {
    display: flex;
    margin-left: auto;
    background: $accent;
    color: $text;
    border-color: $accent;
    font-size: 16px;
    font-family: 'Raleway', 'Arial', sans-serif;
    transition: all .3s;
    min-width: 184px;
    @media (any-hover: hover) {
        &:hover {
           background: darken($accent ,20%);
           border-color: darken($accent, 3%);  
            }  
        }
    @media (max-width:767.98px){
        //justify-content: space-between;
    }    
}  
.btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
}  
.btn-back {
    background: transparent;
    border-color: $textMuted;
    @media (any-hover: hover){
        &:hover{
            border-color: #fff;
            color: #fff;
        }
    }
} 
</style>