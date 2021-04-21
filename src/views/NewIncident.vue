<template>
    <div style="100vh">
        <base-header title="Saisie d'un nouvel incident"></base-header>
        <create-incident-form></create-incident-form>
    </div>
</template>

<script>
import CreateIncidentForm from '@/components/CreateIncidentForm';

export default {
    name: "incident",
    components: {
		CreateIncidentForm,
    },

    data() {
        return {};
	},
};
</script>
