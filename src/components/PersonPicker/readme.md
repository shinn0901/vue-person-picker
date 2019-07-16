## 选人插件

选人插件是基于数据格式，目前是写死的。根据数据格式来调用相应的数据

### 使用方法

```js
<div title="选人控件">
    <span>选择人员：</span>
    <input type="text" readonly :value="rePickedData" @click="show=true" />
</div>
<worker-picker v-model="show" pickedData="pickData" @completed="picked" @cancel="cancel"></worker-picker>
// Vue
export default {
    data(){
        return {
            pickData:[{
                type:'user',
                name:'无名氏',
                id:'551F719C259F4C99812FC9FE5C97F692',
                deptName:'技术部'
            }]
            show: false,
        }
    },
    computed:{
        rePickedData(){
            return pickData.map(item=>item.name).join(' ')
        }
    },
    methods:{
        cancel(){
            console.log("cancel worker picking.")
        },
        picked(val){
            console.log(val)
            this.pickData = val // val ==> Array ( user )
        }
    }
}
```