<script>
import { actions } from '../store';

export default {
    vuex: {
        actions: actions
    },
    data () {
        return {
            content: ''
        };
    },
    methods: {
        onKeyup (e) {
            if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                this.sendMessage(this.content);
                this.sendBotMessage(this.content);
                this.content = '';
            }
        },sendBotMessage(message) {
            let question = {question:message}
            console.log(JSON.stringify(question));
            this.$http.post('https://sgru.azurewebsites.net/qnamaker/knowledgebases/23948b4c-c40c-4032-b924-40737fdd3b26/generateAnswer',
            JSON.stringify(question),{headers: {'Authorization': 'EndpointKey ${your_key}'}}).then(response =>{
                console.log(response.body);
                response.body.answers.forEach(element => {
                    this.sendMessageBot(element.answer);
                });
                },err => console.log(err));
            }
        }
};
</script>

<template>
<div class="text">
    <textarea placeholder="Ctrl + Enter para enviar" v-model="content" @keyup="onKeyup"></textarea>
</div>
</template>

<style lang="less" scoped>
.text {
    height: 160px;
    border-top: solid 1px #ddd;

    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-family: "Micrsofot Yahei";
        resize: none;
    }
}
</style>