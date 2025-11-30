(async()=>{
    const html = await fetch('../../templates/book-form.html').then(r=>r.text());
    document.querySelector("#tpl-book-form").innerHTML = html;
    
    Vue.component('book-form', {
        template : "#tpl-book-form",
        data(){
            return {
                form : {},
                show_message : false,
                form_message : {}
            }
        },
        props : [
            'kategori_list',
            'upbjj_list'
        ],
        watch : {
            form : {
                handler(newVal){
                    if(newVal.kategori && !this.kategori_list.map(item => item.toLowerCase()).includes(newVal.kategori.toLowerCase())){
                        this.form_message = {
                            type : 'warning',
                            text : 'Kategori tidak valid'
                        }
                        return this.show_message = true
                    }if(newVal.upbjj && !this.upbjj_list.map(item => item.toLowerCase()).includes(newVal.upbjj.toLowerCase())){
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
                if(this.form) this.$emit("insert_book", this.form);
                this.form = {};
            }
        }
    })

})();