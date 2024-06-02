<template>
    <div class="page" style="color: white;">
        <div style="display: flex; justify-content: flex-start; margin-bottom: 20px;">
            <v-btn @click="$router.push('/addFormula');" style="border-radius: 7px;">Добавить формулу</v-btn>
        </div>

        <div style="height: 300px; margin-bottom: 30px;" class="container" v-for="formula in formulas"
            :key="formula.key">
            <div class="top-half">
                <div style="display: flex;">
                    <v-btn @click="changeRecord(formula)" class="actionBtn" style="margin-left: 74%;">Изменить</v-btn>
                    <v-btn @click="deleteFormula(formula.key)" class="actionBtn"
                        style="margin-left: 10px;">Удалить</v-btn>
                </div>
                <div class="formulaName">
                    <h2>{{ formula.name }}</h2>
                </div>
            </div>
            <div class="bottom-half">
                <div class="elem" style="margin-top: 1.5%;">
                    <h2>Формула:</h2>
                </div>
                <div class="elem" style="margin-top: 5px">
                    {{ formula.formula }}
                </div>
                <div class="elem" style="margin-top: 5px;">
                    <h2>Пороговое значение:</h2>
                </div>
                <div class="elem" style="margin-top: 5px;">
                    {{ formula.threshold }}%
                </div>
            </div>
        </div>

        <v-dialog v-model="change" width="auto">
            <div class="changeDialog">
                <h4 style="margin-top: 10px; margin-bottom: 10px;">Название</h4>
                <v-text-field label="Название формулы" v-model="changeName" hide-details="auto"></v-text-field>
                <hr style="margin-bottom: 10px;">
                <h4 style="margin-bottom: 10px;">Формула</h4>
                <v-textarea label="Формула" v-model="changeFormula" hide-details="auto"></v-textarea>
                <hr style="margin-bottom: 10px;">
                <h4 style="margin-top: 10px; margin-bottom: 10px;">Порог</h4>
                <v-text-field label="Порог срабатывания" v-model="changeThreshold" hide-details="auto"></v-text-field>
                <hr style="margin-bottom: 10px;">
                <div class="groupChangeBtn">
                    <v-btn @click="updateFormula" style="width: 200px; margin-right: 20px; border-radius: 10px;">Изменить</v-btn>
                    <v-btn @click="change = false" style="width: 200px; border-radius: 10px;">Отмена</v-btn>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import { ref, onValue, remove, update } from "firebase/database";
import { db } from "@/firebase.js";

export default {
    data() {
        return {
            formulas: [],
            change: false,
            changeThreshold: '',
            changeFormula: '',
            changeName: '',
            formulaKey: ''
        };
    },
    methods: {
        fetchFormulas() {
            const formulasRef = ref(db, 'Formulas');
            onValue(formulasRef, (snapshot) => {
                const data = snapshot.val();
                const formulasArray = [];
                for (let key in data) {
                    formulasArray.push({ key, ...data[key] });
                }
                this.formulas = formulasArray;
            });
        },
        deleteFormula(key) {
            const formulaRef = ref(db, `Formulas/${key}`);
            remove(formulaRef).then(() => {
                this.fetchFormulas();
            }).catch((error) => {
                console.error('Ошибка при удалении записи: ', error);
            });
        },
        changeRecord(formula) {
            this.changeName = formula.name;
            this.changeFormula = formula.formula;
            this.changeThreshold = formula.threshold;
            this.formulaKey = formula.key;
            this.change = true;
        },
        updateFormula() {
            const formulaRef = ref(db, `Formulas/${this.formulaKey}`);
            update(formulaRef, {
                name: this.changeName,
                formula: this.changeFormula,
                threshold: this.changeThreshold
            }).then(() => {
                this.change = false;
                this.fetchFormulas();
            }).catch((error) => {
                console.error('Ошибка при обновлении записи: ', error);
            });
        }
    },
    created() {
        this.fetchFormulas();
    }
};
</script>

<style scoped>
.groupChangeBtn {
    margin-top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.changeDialog {
    background-color: #ececec;
    width: 520px;
    padding: 20px;
    border-radius: 10px;
}

.elem {
    display: flex;
    align-items: left;
    color: black;
    margin-left: 3%;
}

.formulaName {
    display: flex;
    align-items: left;
    margin-left: 2%;
    color: black;
}

.top-half {
    background-color: #C0C0C0;
    height: 40%;
}

.bottom-half {
    background-color: #ececec;
    height: 60%;
    display: flex;
    flex-direction: column;
}

.container {
    height: 300px;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
}

.page {
    margin-top: 3%;
    color: azure;
    margin-left: 3.4%;
    width: 70%;
}

.actionBtn {
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 7px;
}
</style>
