<script>
import Loader from "vue-svg-loader!../../assets/loader.svg";

Loader.name = "loader";

export default Loader;
</script>

<style lang="stylus">
  @import "../../stylus/main.styl";
  #root {
    display: block
    height: 100vh;
    width: 10%;
    margin auto auto;
    /*.cls-1 {
      fill:#f6416c;
    }
    .cls-2{
      fill:#ffde7d;
    }
    .cls-3{
      fill:#3a2a2a;
    }
    .cls-4{
      fill:#ddd;
    }*/
    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    #perso {
        animation: rotate 2s linear infinite;
        transform-origin: center;
        transform-box: fill-box;
    }
  }
</style>
