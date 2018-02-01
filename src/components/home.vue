<template>
    <div id="show-blogs">
        <h2>Please Select  City to Check the weather</h2>
        <select v-model="city">
                <option v-for="names in listCities">{{ names }}</option>
        </select>

        <div>
        <h2>Please Enter City to Add to list</h2>
        <input v-model="cityToAdd"/>
        <button  v-on:click="Add">Add</button>
    </div>

    <div>
        <h2>Please enter city to Delete from the list</h2>
        <input v-model="cityToDelete"/>
        <button  v-on:click="Delete">Delete</button>
    </div>
    </div>

    
</template>

<script>
export default {
    data () {
        return {
            listCities: this.$store.state.cities,
            blog:"",
            city:"",
            cityToDelete:"",
            cityToAdd:"",
            addsucess:"",
            deleteSuccess:""

        }
    },
     watch: {
            city: function(val, oldVal){
                this.$router.push({path:'/city/' + val })
            }
        },
      methods:{
        Add:function(){
            console.log("Add function called");
            if(this.$store.state.cities.indexOf(this.cityToAdd)>-1){
                alert("City Already Exists, Please try different Value");
            }
            else{
                this.$store.state.cities.push(this.cityToAdd);
                alert("City Added");
                
            }
           
        },
          Delete:function(){
            console.log("Delete function called");
            if(this.$store.state.cities.indexOf(this.cityToDelete)>-1){
                this.$store.state.cities.splice(this.$store.state.cities.indexOf(this.cityToDelete),1)
                alert("City Deleted From the List");
            }
            else{
                alert("City Does Not Exist in the list");
                
            }
           
        }
    }
}
</script>
<style>
#show-blogs
{
    text-align: center;
}

</style>
