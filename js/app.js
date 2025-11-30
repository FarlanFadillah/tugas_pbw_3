import { getData } from "../services/api.js";
import { arrObjIncludes } from "../utils/js_object_tools.js";

(async()=>{
    var app = new Vue({
        el : "#app",
        data () {
            return {
                upbjjList : [],
                kategoriList : [],
                pengirimanList : [],
                paket : [],
                stok : [],
                tracking : [],
                tabs : 'order-form',
                order_queue : 4,
                show_modal : false,
                modal_info : '',
                modal_message : ''
            }
        },
        methods : {
            openModalForm(){
                this.show_book_form = true;
            },
            insertBook(form){
                const res = arrObjIncludes(this.stok, 'kode', form.kode);
                if(!res.found) {
                    this.stok.push(form);
                    this.openModal("Success", "Stok buku berhasil di update");
                }
                else {
                    this.openModal("Warning", "Buku dengan kode yang sama telah tersedia");
                }
            },
            removeBook(kode){
                this.stok = this.stok.filter(data=> data.kode !== kode);
            },
            insertOrder(form){
                this.tracking.push(form);
                this.order_queue++;
                this.tabs = "tracking";
                this.openModal("Success", "Order berhasil dibuat");
            },
            closeModal(){
                this.show_modal = false;
                this.modal_info = ""
                this.modal_message = "";
            },
            openModal(info, message){
                this.show_modal = true;
                this.modal_info = info
                this.modal_message = message;
            }
        },
        async mounted(){
            this.upbjjList = await getData('upbjjList');
            this.kategoriList = await getData('kategoriList');
            this.pengirimanList = await getData('pengirimanList');
            this.paket = await getData('paket');
            this.stok = await getData('stok');
            this.tracking = await getData('tracking');
        }
    })
})();