(async()=>{

    const html = await fetch('../../templates/do-tracking.html').then(r=>r.text());
    
    document.querySelector("#tpl-tracking").innerHTML = html;

    Vue.component('do-tracking', {
        template : "#tpl-tracking",
        data () {
            return {
                message : '',
                current_seq : 3,
                nomor_do : '',
                current_order : {},
                form : {
                    
                },
                show_message : false,
                generatedDO : 'asdfasd001'
            }
        },
        props : [
            "tracking"
        ],
        computed : {
            tracking_list(){
                let res = [];
                this.tracking.forEach(element => {
                    res.push(Object.keys(element)[0])
                });
                return res;
            }
        },
        methods : {
            showMessage(text){
                this.$refs.message_text.style.opacity = 1;
                this.$refs.loading_circle.style.display = 'none';

                this.message = text;
            },
            searchDoNumber(){
                this.$refs.info_card.style.opacity = 0;
                this.$refs.message_text.style.opacity = 0;
                this.$refs.tracking_card.style.opacity = 0;
                if(!this.nomor_do)
                {
                    return this.showMessage('Number DO is undefined')
                }

                setTimeout(()=>{
                    const result = this.tracking.find(data => Object.keys(data)[0] === this.nomor_do);
                    console.log(result);
                    if(!result){
                        // TODO open modal
                        return this.showMessage('Order not found')
                    }
                    this.current_order = result[this.nomor_do];
                    this.$refs.info_card.style.opacity = 1;
                    this.$refs.tracking_card.style.opacity = 1;
                    this.$refs.loading_circle.style.display = 'none';
                }, 400);
                this.$refs.loading_circle.style.display = 'block';
            },
            resetSearch(){
                this.nomor_do = '';
                this.current_order = {};
                this.$refs.info_card.style.opacity = 0;
                this.$refs.message_text.style.opacity = 0;
                this.$refs.tracking_card.style.opacity = 0;
            }
        }
    })

})();