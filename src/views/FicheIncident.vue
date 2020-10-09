<template>
    <div style="100vh">
        <base-header title="Fiche Incident"></base-header>
		<cosip></cosip>
    </div>
</template>
<script>
import Cosip from '@/components/CosipForm';

export default {
    components: {
		Cosip,
    },

    data() {
        return {};
	},
};
</script>