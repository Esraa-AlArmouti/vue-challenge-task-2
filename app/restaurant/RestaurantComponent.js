var restaurantComponent = Vue.component(
    'x-restaurant',
    {
        props: [],
        data:function(){
            return { Tables: [10,8,10,6,2,6,4,12] }
        },
        template:
            `<div class="restaurant-container" v-if="Tables.length > 0">
                <x-table v-for="(item, index) in Tables" v-bind:table="item"   v-bind:key="index"/>
            </div>`,
        components: {
            'x-table':tableComponent
        },
        mounted:function() {
           this.load(this.$root.saveKey);
        },
        methods:{
            awaitTable: async function(numberOfPeople) {

                let index = this.getIndex(numberOfPeople);
                if(index != null) {
                    return index;
                }
                else
                {
                    alert('no table available');
                    return null;
                }
            },
            getIndex: function(size) {
                let index = null;
                let tmp;
                let lowest = Number.POSITIVE_INFINITY;
                let childs = this.$children;

                for(let i = 0; i < this.Tables.length; i ++) {

                    let isAvailable = childs[i].isAvailable;
                    if (this.Tables[i] >= size && isAvailable) {
                        tmp = this.Tables[i];

                        if (tmp < lowest) {
                            lowest = tmp;
                            index = i;
                        }
                    }

                }

                return index;
            },

            save:function(key){

                let childs = this.$children;
                let state = [];

                childs.forEach(function (tableComp,index)
                {
                    if(!tableComp.isAvailable) {
                        state.push(
                            {
                                index: index,
                                time: tableComp.time,
                                isAvailable: tableComp.isAvailable,
                                numberOfPeople: tableComp.numberOfPeople,
                                msg: tableComp.msg
                            });
                    }
                });

                localStorage.setItem(key, JSON.stringify(state));
            },

            load: function (key) {

                let states = localStorage.getItem(key);
                if(states !== null)
                {
                    states = JSON.parse(states);
                    states.forEach(async (xTable)=>
                    {
                        let tableComponent = this.$children[xTable.index];
                        tableComponent.updateTable(parseInt(xTable.time),xTable.isAvailable,parseInt(xTable.numberOfPeople),xTable.msg);
                        await tableComponent.untilAvailable();
                    });
                }

                return states;

            }
        }
    }
);
