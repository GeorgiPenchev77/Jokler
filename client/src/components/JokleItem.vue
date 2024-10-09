<script>
export default {
  name: 'JokleItem',
  props: ['jokle']
}
</script>

<style scoped>
.jokle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
  background: white;
  padding: 8px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0,0,0, 0.08);
  padding-top: 4%;

}
.name {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 5px;
}
#x {
  height: 60%;
  width: 3%;
  padding: 0.2%;
}
@media (max-width: 1000px){
    .jokle{

      height: 110px;
      padding-right: 5px;
      padding-left: 5px;
      border-radius: 5px;
    }
h5 {
  font-size: 1em;
  padding: 5px;
}
#x {
  height: 40%;
  width: 7%;
  padding: 0.2%;
}
  }
</style>
