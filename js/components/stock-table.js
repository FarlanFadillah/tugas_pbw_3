import { arrObjIncludes } from "../../utils/js_object_tools.js";
(async()=>{
    // Load Templates
    const html = await fetch('../../templates/stock-table.html').then(r=>r.text());
    document.querySelector("#tpl-stock").innerHTML = html;

    // Load style
    // const css = await fetch('../../assets/css/stock.css').then(r=> r.text());
    // const style = document.createElement('style');
    // style.textContent = css;

    // document.head.appendChild(style);

    Vue.component('stock-table', {
        template :'#tpl-stock',
        data () {
            return {
                view_stok : [],         // stok yang ditampilkan di table
                qty_filter : false,     // filter untuk stok yang menipis atau kosong
                sort_by : {},           // config sorting
                filter_key : '',        // nama kolom yang akan disorting
                filter_value : '',      // value yang akan disorting
                filters : [],           // daftar filter
                form : {},              // objek form buku
                form_message : {},      // config message
                show_message : false    // kondisi untuk kapan menampilkan message
            }
        },
        props : [
            "upbjj_list",
            "kategori_list",
            "stok"
        ],
        computed : {
            viewStock(){
                if(this.view_stok.length <= 0) this.view_stok = this.stok;
                const sort = this.sort_by;

                for(const value of this.filters){
                    this.view_stok = this.view_stok.filter(data => data[value.key].toLowerCase() === value.val.toLowerCase())
                }

                if(this.qty_filter)
                {
                    this.view_stok = this.view_stok.filter(data=> Number(data.qty) < Number(data.safety))
                }

                if(sort.column){
                    if(sort.type === 'nan') this.view_stok = this.view_stok.toSorted((a, b) => a[sort.column].localeCompare(b[sort.column]));
                    else if(sort.type === 'num') this.view_stok = this.view_stok.toSorted((a, b) => a[sort.column] - b[sort.column]);
                    if(this.sort_by.order === 'desc') this.view_stok = this.view_stok.toReversed();
                }

                return this.view_stok;
            },
            currentFilterList(){
                switch (this.filter_key) {
                    case 'upbjj':
                        return this.upbjj_list;
                    case 'kategori':
                        return this.kategori_list;
                    default:
                        return [];
                }
            }
        },
        watch : {
            qty_filter(newVal){
                if(!newVal) this.view_stok = [];
            }
        },
        methods : {
            sortby(type, name){
                const prev_order = this.sort_by.order;
                this.sort_by = {
                    column : name,
                    order : prev_order === 'desc' ? 'asc' : 'desc',
                    type : type
                }
            },
            resetFilter(){
                this.filters = [];
                this.sort_by.column = '';
                this.view_stok = [];
            },
            addFilter(){
                if(!this.filter_key || !this.filter_value) return;
                const obj = arrObjIncludes(this.filters, 'key', this.filter_key);
                if(!obj.found)
                {
                    this.filters.push({
                        key : this.filter_key,
                        val : this.filter_value
                    })
                }
                else {
                    this.filters[obj.index].val = this.filter_value
                }

                this.filter_key = '';
                this.filter_value = '';
                this.view_stok = [];
            },
            rmFilter(key){
                this.filters = this.filters.filter(data=> data.key !== key);
                this.view_stok = [];
            },
            removeItem(kode){
                this.view_stok = [];
                this.$emit('remove-item', kode);
            }
        }
    })
})();