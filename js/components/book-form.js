(async()=>{
    const html = await fetch('../../templates/book-form.html').then(r=>r.text());
    document.querySelector("#tpl-book-form").innerHTML = html;
    
    Vue.component('book-form', {
        template : "#tpl-book-form",
        data(){
            return {
                form : {},
                show_message : false,
                form_message : {},
                method : 'insert'
            }
        },
        props : {
            kategori_list : Array,
            upbjj_list : Array,
            form_to_update : Object
        },
        watch : {
            form : {
                handler(newVal){
                    if(newVal?.kategori && !this.kategori_list.map(item => item.toLowerCase()).includes(newVal.kategori.toLowerCase())){
                        this.form_message = {
                            type : 'warning',
                            text : 'Kategori tidak valid'
                        }
                        return this.show_message = true
                    }if(newVal?.upbjj && !this.upbjj_list.map(item => item.toLowerCase()).includes(newVal.upbjj.toLowerCase())){
                        this.form_message = {
                            type : 'warning',
                            text : 'UPBJJ tidak valid'
                        }
                        return this.show_message = true
                    }else {
                        return this.show_message = false;
                    }
                },
                deep : true
            }
        },
        methods : {
            submitForm(){
                this.form.harga = Number(this.form.harga);
                
                if(this.form && this.method === "insert") this.$emit("insert_book", this.form);
                if(this.form_to_update && this.method === "update") this.$emit("update_book", this.form);
                this.form = {};
            },
            resetForm(){
                this.form = {};
            }
        },
        mounted (){
            this.form = {};
            this.method = "insert";
            if(this.form_to_update) {
                this.form = this.form_to_update;
                this.method = "update";
            }
        }
    })

})();