import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name:'QAvatar',
    props:{
        name:PropType.string
    },
    mounted(){
        console.log('start avatar')
    },
    render(){
        const {name} = this.$props
        return (
            <span>{name}</span>
        )
    }

})