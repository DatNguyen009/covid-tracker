<template>
    <ListRank :data="dataConfirmed" />
</template>

<script>
import ListRank from '@/components/listRank.vue'
export default {
    data() {
        return {
            dataConfirmed: []
        }   
    },
    async created() {
        await this.$store.dispatch('RankConfirmed', {
            url: "https://covid19.mathdro.id/api/confirmed",
        })
        this.dataConfirmed = this.$store.state.dataRankConfirmed.sort(this.compare);
    },
    
    methods: {
        compare(a, b){
            if (a.confirmed < b.confirmed) {
                return 1;
            }
            if (a.confirmed > b.confirmed) {
                return -1;
            }
            return 0;
        }
    },

    components:{
        ListRank,
    }
}
</script>

<style>

</style>