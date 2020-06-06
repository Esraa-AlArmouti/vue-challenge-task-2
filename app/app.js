let app = new Vue(
    {
        el: '#app',
        data: {
            num_people: null,
            duration_statu: null,
            message: null,
            saveKey:'my-save-key'
        },
        methods: {
            save: async function(key) {

                let restaurantComp =  app.$refs.restaurant;
                let tableIndex = await restaurantComp.awaitTable(this.num_people);

                if(tableIndex !== null)
                {
                    let tableComponent = restaurantComp.$children[tableIndex];
                    tableComponent.updateTable(this.duration_statu,false,this.num_people,this.message);
                    await tableComponent.untilAvailable();
                    restaurantComp.save(this.saveKey);
                }

            },
            evict:function () {
                app.$refs.restaurant.save(this.saveKey);
            }
        },
        components:{
            'x-resturant':restaurantComponent
        },
    });
