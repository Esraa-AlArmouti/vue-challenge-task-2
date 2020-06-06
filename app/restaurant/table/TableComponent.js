var tableComponent = Vue.component(
    'x-table',
    {
        props: ['table'],
        template:
            `
                    <div class="table-container">
                        <div v-if="!isAvailable" >
                            <center><br><h4>Occupied by {{numberOfPeople}}</h4>
                            <h4>(free in: {{parseInt(time/60)}}:{{time%60}})</h4>
                            <button v-on:click="evict()" >Evict</button></center>
                        </div>
                        <div v-else>
                            <center><br><br><h4>Table Available</h4>
                            <h4>(Capacity={{table}})</h4></center>
                        </div>
                    </div>

                    `,


        data:function(){
          return {
              time:0,
              isAvailable:true,
              numberOfPeople:0,
              msg:''
          }

        },
        methods:{
            evict: function(){

                alert(this.msg);
                this.numberOfPeople = 0;
                this.isAvailable = true;
                this.time = 0;
                this.msg = '';
                app.evict();
            },
            untilAvailable: async function()
            {
                let timer = setInterval(()=> {
                    this.time=this.time -1;
                    if(this.time<=0) {
                        clearInterval(timer);
                        this.isAvailable = true;
                        this.numberOfPeople=0;
                        this.msg = '';
                        app.evict();
                    }
                }, 1000);
            },
            updateTable:function (_time,_isAvailable,_numberOfPeople,_msg) {

                this.time = _time;
                this.isAvailable = _isAvailable;
                this.numberOfPeople = _numberOfPeople;
                this.msg = _msg;

            }


        }
    }
);
