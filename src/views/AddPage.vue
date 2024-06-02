<template>
    <div class="centered-container">
        <h1 style="color: white; margin-bottom: 15px;">Добавить формулу</h1>
        <div style="color: white; width: 400px;">
            <v-text-field label="Название" v-model="name" hide-details="auto"></v-text-field>
            <v-textarea full-width label="Формула" v-model="formula" hide-details="auto">
            </v-textarea>
            <v-text-field label="Пороговое значение, %" v-model="threshold"></v-text-field>
        </div>
        <div>
            <v-btn @click="addFormula" class="transparent-button">
                Добавить
            </v-btn>
        </div>
        <v-btn @click="$router.push('/');" class="transparent-button">
            Отмена
        </v-btn>
    </div>
</template>

<script>
import { ref, push } from "firebase/database";
import { db } from "@/firebase.js";

export default {
    data() {
        return {
            formula: '',
            threshold: '',
            name: ''
        };
    },
    methods: {
        addFormula() {
            const formulasRef = ref(db, 'Formulas');
            push(formulasRef, {
                formula: this.formula,
                threshold: this.threshold,
                name: this.name
            }).then(() => {
                this.$router.push('/');
            }).catch((error) => {
                console.error('Ошибка при добавлении формулы: ', error);
            });
        }
    }
};
</script>

<style scoped>
.centered-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.transparent-button {
    width: 400px;
    margin-bottom: 10px;
    color: white;
    border: 1px solid white;
    background-color: transparent !important;
}
</style>
