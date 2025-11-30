(async()=>{
    const html = await fetch('../../templates/order-form.html').then(r=>r.text());
    
    document.querySelector("#tpl-order-form").innerHTML = html;

    Vue.component('order-form', {
        template : "#tpl-order-form",
        data(){
            return {
                order_form : {},
                form_message : {},
                show_message : false,
                generatedDO : '',
            }
        },
        props : [
            "pengiriman_list",
            "paket",
            "order_queue"
        ],
        watch : {
            order_form : {
                handler(newVal){
                    if(newVal.expedisi && !this.pengiriman_list.map(item => item.kode.toLowerCase()).includes(newVal.expedisi.toLowerCase())){
                        this.form_message = {
                            type : 'warning',
                            text : 'Expedisi tidak valid'
                        }
                        return this.show_message = true;
                    }else {
                        return this.show_message = false;
                    }
                },
                deep : true
            }
        },
        methods : {
            generateDO(){
                const date = new Date();
                this.generatedDO = 'DO' + date.getFullYear() + '-' + String(this.order_queue).padStart(4, '0');
            },
            submitForm(){
                const order_obj = {}
                const date = new Date();
                this.order_form.perjalanan = [
                    { waktu: date.toISOString(), keterangan: "Pesanan Dibuat"},
                    { waktu: date.toISOString(), keterangan: "Pengirim telah mengatur pengiriman. Menunggu Pesanan diserahkan ke pihak jasa kirim"},
                ]
                this.order_form.paket = this.order_form.paket.nama;
                
                order_obj[this.generatedDO] = this.order_form;
                
                this.$emit('insert_order', order_obj);
                this.resetForm();
            },
            resetForm(){
                this.order_form = {};
            }
        },
        mounted(){
            this.generateDO();
        }
    })
})();