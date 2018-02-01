<template>
    <div id="single-blog">
    <div v-if="dataFlag">
        <h1>Weather App of {{this.id}}</h1>
        <button v-if="flag" v-on:click="toggle">Show Graph</button>
        <button v-if="!flag" v-on:click="toggle">Show Table</button>
        <div v-if="!flag" class="ActivityGraphWrapper">
            <div class="box box-primary">
                <div class="box-header with-border">
                </div>
                
                <div class="box-body">
                <div class="row">
                    <div class="col-md-8">
                    <line-chart></line-chart>
                    </div>
                </div>
                </div>
            
            </div>
        </div>

        <table v-if="flag" id="firstTable">
                    <thead>
                        <tr>
                        <th>Date</th>
                        <th>Temparature</th>
                        <th>Minimum Temp</th>
                        <th>Maximum Temp</th>
                        <th>Pressure</th>
                        <th>Humidity</th>
                        <th>Weather</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(value,index) in weatherInfo">
                        <td>{{new Date(value.dt*1000).toLocaleDateString()}}</td>
                        <td>{{value.main.temp}}</td>
                        <td>{{value.main.temp_min}}</td>
                        <td>{{value.main.temp_max}}</td>
                        <td>{{value.main.pressure}}</td>
                        <td>{{value.main.humidity}}</td>
                        <td>{{value.weather[0].description}}</td>
                        </tr>
                    </tbody>
        </table>
        </div>
        <div v-if="!dataFlag">
            <h1>No Weather Data Exist For the City</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import {Line,mixins} from 'vue-chartjs';

export default {
    data () {
        return {
            id: this.$route.params.id,
            weatherInfo: [],
            city:"",
            flag:true,
            dataFlag:false,

        }
    },
    created() {
        var self=this;
            self.$store.state.label=[];
            self.$store.state.value=[];
          axios.get("http://api.openweathermap.org/data/2.5/forecast?q="+this.id+"&units=imperial"+"&appid=4cab3f909d7dce6603c33553e32b1d7d").then(function(response){
            console.log(response.data.cod);
            if(response.data.cod=="200"){
            self.dataFlag=true;
            self.city=response.data.city.name;
            self.$store.state.dataReceived=response.data;
            for(let i=0;i<response.data.list.length;i+=8){
                
                self.weatherInfo.push(response.data.list[i]);
                self.$store.state.label.push(new Date(response.data.list[i].dt*1000).toLocaleDateString());
                self.$store.state.value.push(response.data.list[i].main.temp);
            }
            console.log(self.$store.state.label);
            console.log(self.$store.state.value);
            }
           
             
            
           
        });
    },
    methods:{
        toggle:function(){
            console.log("Toggle function called");
            this.flag=!this.flag;
        }
    }
}
Vue.component('lineChart',{
    extends:Line, 
  data () {
        return {
            label: [],
            value:[]

        }
    },
     mounted () {  
    this.renderChart({
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {label: 'WeatherApp', backgroundColor: '#979aa0', data: [12, 19, 3, 5, 2, 15]}
      ]
    },{responsive: true, maintainAspectRatio: false}
  
  )
    
  }


  });
</script>

<style>
table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: 10px 10px 0 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}


</style>
