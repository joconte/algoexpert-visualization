<template>
    <div>
        <a style="width: 210px;     flex: 0 0 auto;
    text-decoration: none!important;
    text-align: center;"><div style="    display: flex;
    align-items: center;
    margin: 0 0 10px;
    justify-content: center;
    padding-top: 5vh;"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABuCAMAAADmp0YAAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAECAwQFBgcH+Pn6+/z9/vBVGEbAAABi1JREFUaN6tWleC4yAMtQGbYtr9T7vJ2BSBQHhm+dnZJCDUngratu8S2sXvCpcS+/bHtR/yCj/HOSPyp9zEagUr/0LitL4+zT535i62y/DfURAmtEd59v2CdZ//3OB4LybhsKN+qOiIL3u+5MIODjIVIyGE33Pz4aLZXI4LbJP3X9dXC/xQ8DrXom74BW+nxXejeD6VmwVG8OHsBHTUgkXvOgDjLFtuKna7vweCASYdSJmdtc1qwLu4P9yS2MBiKvSmji9WScrr5py9JuL7zXqNmTNMRevnRDamaWb2ig3DkB9QRD4SLWbpUTM7PGXuNZEwEIasZNGzURQX1IDTmkjktFpdIw5eTN2ykf88ine9CQ80GwSQZRaVH+PP8fiJfZxyxUYVJqohG1ncNv87WeVA81gZy+4azpkXJQ6SU06hyTXRIf/fzsHtvp3Y9jDVfOsPgdc4Yth025Hh5GZJUwBV3P/IGE5FHJ1VoSbuWOu/D6xkHPD5/o8tk2DLmsh3MWrHLa0oildqOm4AKhcdaG5puervsBAApygzwhRT+/5CQC8ScwsB8wCI5Wh/vG/j32g9Bfbk0XHBVVr7ChQvIgC5Pv5oCBq+yXmIS5nmV3rhbpmGdQBiiN+bNqlQKzQ+GHmVrG2CqsVJgI4mrGRINDWSTXh5VHD1EWzICg8Q6y1JpWdk292UlcxHuthOUXks0e+IL2tSH2kR2lcRC7iPPLAt+dqmvlfSi5uI1+Px4kJoGDzDs3G45fGReA4glg+DomkVlr6wI2fvgfoxMD/KiZFM9arMGizXmxZk5cDRHc2Gk/ZPdA8mRxaRuCLDDHSz2Z1IHMGxTfcemdLEoTt4BCz1zB0eJKhEyQMVPBAqSbn7NLr6LkGdBE3RhsrkVYrIFBS0nrrQYqe5PquqqUTjLmqsdah7BoxXVcVX6BMiFWsd8DA032aDrXPGosADNARE4963idlIJ1g+A1u6UslLRJNDnhDCf9BCriQzRzKWZDalvmpjfLGoRMXvPC6lV4+yrelMs2/0uEaX8boGMIeXFLG7UjrInVzaVi1HfJUt5cNaY5d1Q+BokVG/yJWa39dsW2D+V4tz9lWanC2sQQYHLIq3RPaya6l5lQXGe1jfgepCH4+aQpxKYpufO0CX/ZWIm4hLgZQgYFa5JK66OdTnz6x2TIu2i/S6sFpDedDWy6qrKbEajK5BKitpwTR/kVvYRZwndEaKRoKVq1Oj6GBFthE0wcq1VOdFlkCvwlPdN5VhMHQsFWPTLsJehM16YzERa/XnTYH3Efx90MoJEuzVgaDlSGgRAOFk7FLzXd6HeMXaiz3nMtLCLniqxUIQ+y6ks3dBQ3NEw8G22c2sL3zEwSY5h1/RVe7jqi2nf6IFsUHkwtJUompLLT2AiiqO2wLPpeANjimVxGmQSLqLBkiDylJOqrZc56nVqo0PDjPDqi3XeaMiiA/yYITHUdU2rvOSs3R1nhw3cXAqmQbWwjN4jucmsdMhEpvSyL0CVFdEswCJhIP6SI/LvLgTLSLXmsMos05mjCCjoptdS3zgDZyL6ixBKma5FWU7v9ZLjbvCh+NvmmpL7cEUsCzd7KpY0Q1q6XeNTs9WGp3ZluRaxg9bthSN5PYS7RKv5WQkjXSsA9C48PxetdFpGsnB+bLau8xrZY6iVrVbTJN3kHddq3fylbeTZUXzsL8gMV76mnqtquAen+OgKx29rT6c5eQxHGJZMfkp6PGxeQ+BqXz9oy5hiIcKkUxKLJQU5THzhvbi/G7uwUndC8+yJc9Oj5dV9SZpf5QLD8x5dCdUcxwS7Sjgia8ln8qlHzyVh64nNcqU3fqjf/skXj1uDt8cOZj2GPxKFTYU+w3KBHIQ4yh39ag8y3RBdGJSKIyJ8GpWa6Tc3RJvwXMiu6rqckkXQQPU8JMxH64qpLJsLcZ8x3x2NJhuSNbK64rdk2/CoFECZw2e0YKmI/eR02nrQSqzEAJ30Ea4iss+EcjmavRrHVzo/zNEpo6fmbRco+5xOA7njvWZyMPOxuHGg31ie7XO0WCfxjrXz5TT+8nOAyVzJ+U9lfDfhy3hRNt3PvXc/rCAcQIcEPrmxl/q+PMA7FYGYPWt139Q6uryekUiBAAAAABJRU5ErkJggg==" alt=""
                                   style="transform: rotate(356deg); height: 30px;   margin: 0 15px 0 0;">
            <h1 style="font-size: 24px;    font-family: Jura,Helvetica,Arial,sans-serif;
    color: #fff;
    margin: 0;
    line-height: 1; font-weight: 400">AlgoExpert</h1>
        </div>
            <div style="font-size: 14px;font-family: Jura,Helvetica,Arial,sans-serif;
    color: #f44292;
    font-weight: 600;">Ace the Technical Interviews</div>
            <div style="font-size: 14px;font-family: Jura,Helvetica,Arial,sans-serif;
    color: #f44292;
    font-weight: 600;">SWE Project Contest Summer-Fall 2020</div>
            <div style="font-size: 14px;font-family: Jura,Helvetica,Arial,sans-serif;
    color: #f44292;
    font-weight: 600;">Jonathan Conté</div>
        </a>
    <div style="padding-top: 20vh">
        <div class="choiceList">
            <label style="color: black;    font-family: Ubuntu,Helvetica,Arial,sans-serif;
    margin-bottom: 20px;
    font-size: 23px; font-weight: 400;">Recursion Visualization</label>
            <ChoiceLikeAlgoExpert style="margin-top: 20px" v-on:click.native="goToFibo" >Fibonacci</ChoiceLikeAlgoExpert>
            <ChoiceLikeAlgoExpert v-on:click.native="goToPermut">Permutations</ChoiceLikeAlgoExpert>
        </div>
    </div>
    </div>
</template>

<script>
    import ChoiceLikeAlgoExpert from "./ChoiceLikeAlgoExpert";
    import {router} from "../router";

    export default {
        name: "ChooseAlgo",
        components: {ChoiceLikeAlgoExpert},
        methods: {
            goToFibo() {
                router.push("/Fibonacci")
            },
            goToPermut() {
                router.push("/Permutations")
            }
        },
    }
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Jura&display=swap');

    .choiceList {
        margin: auto;
        width: fit-content;
        background-color: #F6F9FC;
        padding: 20px;
        border-radius: 10px;
    }
</style>
