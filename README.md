# vue-person-picker 
这是一款基于vue的选人插件

## 安装
```
npm install @shinn0901/vue-person-picker --save
```

## 使用
```js
<template>
    <button @click="show=true" />
    <person-picker
        :person="personData"
        :keys="keys"
        @picked="picked"
        @cancel="cancel"
        v-model="show" />
</template>
<script>
    import PersonPicker from '@shinn0901/vue-person-picker'
    export default {
        data(){
            show:false, //required
            personData:{ //required
                id:'#',
                category:'organization',
                name:'公司名字',
                description:'公司描述',
                children:[
                    {
                        id:'#1',
                        category:'organization',
                        name:'销售部',
                        description:'销售部描述',
                        children:[{
                            id:'#3',
                            userName:'zhangsan',
                            category:'user',
                            name:'张三',
                            description:'销售主管',
                        },
                        {
                            id:'#4',
                            userName:'lisi',
                            category:'user',
                            name:'李四',
                            description:'销售员',
                        }]
                    }
                ]
            },
            keys:{
                organization: {
                    name: 'name', //默认显示name属性
                    description: 'description' 
                },
                user: {
                    name: 'name',
                    description: 'description',
                    match: ['name', 'description','userName'] //搜索时,匹配哪些字段
                }
            }
        },
        methods:{
            picked(arr){
                //arr [user,user]
            },
            cancel(){

            }
        },
        components:{
            PersonPicker
        }
    }
</script>
```
