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
                tabs : 'stok',
                order_queue : 4,
                show_modal : false,
                show_confirm : false,
                confirm_answer : null,
                modal_info : '',
                modal_message : '',
                book_form : null
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
                    this.openModal("Success", "Stok Buku berhasil ditambahkan");
                }
                else {
                    this.openModal("Warning", "Buku dengan kode yang sama telah tersedia");
                }
            },
            async removeBook(kode){
                this.openConfirm('Confirm', "Apakah anda yakin ingin menghapus item ini?");

                const ans = await new Promise(resolve =>{
                    this.confirm_answer = resolve;
                })

                if(ans) this.stok = this.stok.filter(data=> data.kode !== kode);
            },
            editBook(kode){
                const book = this.stok.find(data => data.kode === kode);
                this.book_form = {...book};
                this.tabs = 'book-form';
            },
            updateBook(form){
                console.log(form);
                this.stok = this.stok.filter(data=>data.kode !== form.kode)
                this.stok.push(form);
                this.book_form = null;
                this.openModal("Success", "Stok buku berhasil di update");
            },
            insertOrder(form){
                this.tracking.push(form);
                this.order_queue++;
                this.tabs = "tracking";
                this.openModal("Success", "Order berhasil dibuat");
            },
            closeModal(){
                this.show_modal = false;
                this.show_confirm = false;
                this.modal_info = ""
                this.modal_message = "";
            },
            openModal(info, message){
                this.show_modal = true;
                this.modal_info = info
                this.modal_message = message;
            },
            openConfirm(info, message){
                this.show_confirm = true;
                this.modal_info = info
                this.modal_message = message;
            },
            confirmModal(ans){
                this.confirm_answer(ans);
                this.closeModal();
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