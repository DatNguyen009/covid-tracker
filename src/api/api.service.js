import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";
import CryptoJS from "crypto-js"

export const URl_API = 'http://192.168.1.6/API/';
const API_KEY = '38e8643fb0dc04e8d65b99994d3dafff';
const PRIVATE_KEY = '10a01dcf33762d3a204cb96429918ff6';


const ApiService = {

    init() {
        Vue.use(VueAxios, axios);
        //Vue.axios.defaults.baseURL = 'http://1751120029.ihostfull.com/API/';
        Vue.axios.defaults.baseURL = URl_API;
        //
    },

    get(resource, params = {}) {
        return Vue.axios.get(resource, {
            params
        });
    },

}
export default ApiService;
export const Mp3Service = {
    getSongInfo(id) {
        const url = this.buildAPIURL('/song/get-song-info', {
            id
        });
        // return url;
        fetch(url)
            .then(function(response) {
                return response.text();
            })
            .then(function(text) {
                console.log('Request successful', text);
            })
            .catch(function(error) {
                console.log('Request failed', error)
            });
        //return ApiService.get(`/get-song.php?url=${encodeURIComponent(url)}`);
    },

    getBeatInfo(id) {
        const url = this.buildAPIURL('/song/get-streamings-beat', {
            id
        });
        //console.log(url);
        //console.log(encodeURIComponent(url));
        return ApiService.get(`/get-song.php?url=${encodeURIComponent(url)}`);
    },

    getLyric(id) {
        const url = `https://m.zingmp3.vn/xhr/lyrics/get-lyrics?media_id=${id}`;
        return ApiService.get(`/get-song.php?url=${encodeURIComponent(url)}`);
    },

    search(keyword) {
        const url = this.buildAPIURL('/search/multi', {
            q: encodeURIComponent(keyword)
        });

        //console.log(url);
        return ApiService.get(`/get-song.php?url=${encodeURIComponent(url)}`);
    },

    buildAPIURL(e, t) {
        let n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 'https://zingmp3.vn/api';
        t.ctime = this.getCurrentTime(),
            t.sig = this.buildSig(e, t),
            t.api_key = API_KEY;
        let i = this.buildQuery(t);
        return "".concat(n).concat(e, "?").concat(i)
    },

    getCurrentTime() {
        return Math.round((new Date).getTime() / 1e3)
    },

    buildSig(e, t) {
        let n = this.buildMessage(t),
            i = this.sha256("" + n);
        return this.hmacSHA512(e + i, PRIVATE_KEY)
    },

    sha256(e) {
        return CryptoJS.SHA256(e)
    },
    hmacSHA512(e, t) {
        return CryptoJS.HmacSHA512(e, t)
    },

    buildMessage(e) {
        let t = this.sortObject(e),

            n = [];
        for (let i in t) "ctime" !== i && "id" !== i || null !== e[i] && void 0 !== e[i] && (n[i] = t[i]);
        return this.buildQuery(n, "")
    },

    sortObject(t) {
        let n = {};
        return Object.keys(t).sort().forEach(function(e) {
            n[e] = t[e]
        }), n
    },

    buildQuery(t) {
        let e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "&",
            n = encodeURIComponent;
        return Object.keys(t).map(function(e) {
            return 2e3 < n(t[e]).length ? "" : "".concat(n(e), "=").concat(n(t[e]))
        }).filter(function(e) {
            return "" !== e
        }).join(e)
    },
}