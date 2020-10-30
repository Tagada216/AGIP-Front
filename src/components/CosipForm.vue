<template>
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-row :gutter="20">
            <el-col :span="6">
                <!-- Références incident -->
                <el-card>
                    <div slot="header">
                        <h4 class="card-header">Référence de l'incident</h4>
                    </div>
 					<el-table :data="form.references" border>
                        <el-table-column label="Référence">
                            <template slot-scope="scope">
                                <el-input
                                    v-model="
                                        form.references[scope.$index].reference
                                    "
                                ></el-input>
                            </template>							
                        </el-table-column>
                    </el-table>
                </el-card>
                <!-- Fin Références incident -->

                <!-- Horodatages -->
                <el-card>
                    <div slot="header">
                        <h4 class="card-header">Horodatages de l'incident</h4>
                    </div>

                    <el-form-item label="Date de début" prop="date_debut">
                        <el-date-picker
                            id="date_debut"
                            v-model="form.date_debut"
                            type="datetime"
                            placeholder="Selectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                    </el-form-item>

                    <el-form-item label="Mois" prop="mois_cosip">
						<el-input
							id="mois_cosip"
							placeholder="Mois"
							v-model="form.mois_cosip"
						></el-input>
                    </el-form-item>

					<el-form-item label="Semaine COSIP" prop="semaine_cosip">
						<el-input
							id="semaine_cosip"
							placeholder="Semaine COSIP"
							v-model="form.semaine_cosip"
						></el-input>
					</el-form-item>

					<el-form-item label="Date de fin" prop="date_fin">
                        <el-date-picker
                            id="date_fin"
                            v-model="form.date_fin"
                            type="datetime"
                            placeholder="Selectionnez l'horodatage"
                            format="dd/MM/yyyy HH:mm:ss"
                            value-format="yyyy-MM-dd HH:mm:ss"
                        ></el-date-picker>
                    </el-form-item>

                </el-card>
                <!-- Fin Horodatage -->
            </el-col>

            <!-- Info Générales -->
            <el-col :span="18">
                <!-- Infos générales incident -->
                <el-card>
                    <div slot="header">
                        <h4 class="card-header">
                            Informations générales de l'incident
                        </h4>
                    </div>

                    <el-row :gutter="20">
						<el-col :span="6">
							<el-form-item label="Statut" prop="statut_id">
								<el-select v-model="form.statut_id">
									<el-option
										v-for="item in remoteEnum.statut"
										:key="item.id"
										:label="item.nom"
										:value="item.id"
									></el-option>
								</el-select>
							</el-form-item>
						</el-col>
                    </el-row>

					<el-form-item label="Résumé" prop="description">
                        <el-input
                            id="description"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Résumé"
                            v-model="form.description"
                        ></el-input>
                    </el-form-item>

					<el-form-item label="Cause"
						prop="cause"
					>
						<el-input
							id="cause"
							type="textarea"
							:autosize="{ minRows: 4, maxRows: 8 }"
							placeholder="Cause"
							v-model="form.cause"
						></el-input>
					</el-form-item>

                    <el-form-item label="Origine"
						prop="origine"
					>
						<el-input 
							id="numChangement"
							placeholder="Numéro de changement"
							v-model="form.numChangement"
						></el-input>
                        <el-input
                            id="origine"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Origine"
                            v-model="form.origine"
                        ></el-input>
                    </el-form-item>

                    <el-card>
							<div slot="header">
								<h4 class="card-header">Rétablissement</h4>
							</div>
							<el-row :gutter="20">
								<el-col :span="6">
									<el-form-item>
										<el-checkbox>Crise</el-checkbox>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item 
										label="Problème ?"
										prop="probleme"
									>
										<el-input id="probleme" placeholder="Problème" v-model="form.probleme"></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row :gutter="20">
								<el-col :span="6">
									<el-form-item label="Détection"
										prop="date_detection"
									>
										<el-date-picker
											id="date_detection"
											v-model="form.date_detection"
											type="datetime"
											placeholder="Sélectionnez l'horodatage"
											format="dd/MM/yyyy HH:mm:ss"
											value-format="yyyy-MM-dd HH:mm:ss"
										/>
									</el-form-item>
								</el-col>
								<el-col :span="6">
									<el-form-item label="Première communication à l'enseigne"
										prop="date_premiere_com"
									>
										<el-date-picker
											id="date_premiere_com"
											v-model="form.date_premiere_com"
											type="datetime"
											placeholder="Sélectionnez l'horodatage"
											format="dd/MM/yyyy HH:mm:ss"
											value-format="yyyy-MM-dd HH:mm:ss"
										/>
									</el-form-item>
								</el-col>
							</el-row>
							<el-form-item
								label="Action de rétablissement"
								prop="action_retablissement"
							>
								<el-input
									id="action_retablissement"
									type="textarea"
									:autosize="{ minRows: 4, maxRows: 8 }"
									placeholder="Action de rétablissement"
									v-model="form.action_retablissement"
								></el-input>
							</el-form-item>
							
							<el-form-item label="Plan d'action" prop="plan_action">
								<el-input
									id="plan_action"
									type="textarea"
									:autosize="{ minRows: 4, maxRows: 8 }"
									placeholder="Plan d'action"
									v-model="form.plan_action"
								></el-input>
							</el-form-item>
                    </el-card>
                	<el-card>	
						<div slot="header">
							<h4 class="card-header">Enseignes impactées</h4>
						</div>
						<el-form-item label="Enseigne(s) impactée(s)" prop="enseigne_impactee">
							<el-checkbox-group @change="verifCheckEnseignesImpactees" v-model="form.enseigne_impactee" style="text-align:left; margin-left:5px;">
								<el-checkbox
									v-for="enseigne in remoteEnum.enseignes"
									:label="enseigne.id"
									:key="enseigne.id"
									v-if="!enseigne.is_deprecated"
								>{{ enseigne.nom }}</el-checkbox>
							</el-checkbox-group>
							<el-tabs type="border-card" v-model="activeName">
								<el-tab-pane label="BDDF" name="tabBDDF">
									<el-form-item v-show="formulaireBDDF">
										<el-row :gutter="20">
										<el-col :span="6">
											<el-form-item label="Priorité" prop="priorite_idBDDF">
												<el-select
													v-model="form.priorite_idBDDF"
												>
													<el-option
														v-for="item in remoteEnum.priorites"
														:key="item.id"
														:label="item.priorite"
														:value="item.id"
													></el-option>
												</el-select>
											</el-form-item>
										</el-col>

										<el-col :span="6">
											<el-form-item label="Impact Avéré" prop="impact_avereBDDF">
												<el-select
													id="impact_avereBDDF"
													v-model="valueImpactBDDF"
												>
													<el-option
														v-for="item in optionsImpactAvere"
														:key="item.value"
														:label="item.label"
														:value="item.value"
													></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											Criticité
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="6">
											<template>
												<el-checkbox @change="validateImpactReseauBDDF" v-model="impactReseauBDDF">Impact Réseau</el-checkbox>
											</template>
												<el-card v-show="cardImpactReseauBDDF">
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															Durée d'indisponibilité
														</el-col>
														<el-col :span="12">
															<el-input placeholder="HH:MM" v-model="form.indispoBDDF"></el-input>
														</el-col>
													</el-row>
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															Nombre d'utilisateurs
														</el-col>
														<el-col :span="12">
															<el-input v-model="form.nbUtilisateurBDDF"></el-input>
														</el-col>
													</el-row>
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															Taux d'indisponibilité
														</el-col>
														<el-col :span="12">
															<el-input placeholder="%" v-model="form.tauxIndispoBDDF"></el-input>
														</el-col>
													</el-row>
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															JFS : 
														</el-col>
													</el-row>
												</el-card>
										</el-col>
										<el-col :span="6">
											<template>
												<el-checkbox @change="validateImpactClientBDDF" v-model="impactClientBDDF">Impact Client</el-checkbox>
											</template>
											<el-card v-show="cardImpactClientBDDF">
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col style="text-align:center">Durées d'indisponibilité (HH:MM)</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Logitelnet/SCAD
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.logitelBDDF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														3955/3933
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.chiffreBDDF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														DAB
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.dabBDDF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Progeliance net/EIPRO
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.progelianceBDDF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														ETECE
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.eteceBDDF"></el-input>
													</el-col>
												</el-row>
											</el-card>
										</el-col>
									</el-row>
									<el-form-item label="Impact" prop="description_impactBDDF" style="margin-bottom:20px;">
										<el-input
											id="description_impactBDDF"
											type="textarea"
											:autosize="{ minRows: 4, maxRows: 8 }"
											placeholder="Impact"
											v-model="form.description_impactBDDF"
										></el-input>
									</el-form-item>
									<el-table :data="form.application_impactee" border style="margin-bottom:20px;">
										<el-table-column
											label="Application(s) impactée(s)"
											prop="application_impactee"
										>
											<template slot-scope="scope">
												<el-autocomplete
													placeholder="Application impactée"
													v-model="
														form.application_impactee[scope.$index]
															.display_name
													"
													:fetch-suggestions="getMatchingApplications"
													value-key="display_name"
													@select="appSelected"
												></el-autocomplete>
											</template>
										</el-table-column>
										<el-table-column width="60">
											<template slot="header">
												<el-button
													type="primary"
													icon="el-icon-plus"
													circle
													@click="handleCreateApp()"
												/>
											</template>
											<template slot-scope="scope">
												<el-button
													type="danger"
													icon="el-icon-delete"
													circle
													@click="handleDeleteApp(scope.$index)"
												/>
											</template>
										</el-table-column>
										<template slot="empty">
											<span class="arrayFormEmpty">Aucune donnée</span>
										</template>
									</el-table>
									</el-form-item>
								</el-tab-pane>
								<el-tab-pane label="CDN" name="tabCDN">
									<el-form-item v-show="formulaireCDN">
										<el-row :gutter="20">
										<el-col :span="6">
											<el-form-item label="Priorité" prop="priorite_idCDN">
												<el-select
													id="priorite_idCDN"
													v-model="form.priorite_idCDN"
												>
													<el-option
														v-for="item in remoteEnum.priorites"
														:key="item.id"
														:label="item.priorite"
														:value="item.id"
													></el-option>
												</el-select>
											</el-form-item>
										</el-col>

										<el-col :span="6">
											<el-form-item label="Impact Avéré" prop="impact_avereCDN">
												<el-select
													id="impact_avereCDN"
													v-model="valueImpactCDN"
												>
													<el-option
														v-for="item in optionsImpactAvere"
														:key="item.value"
														:label="item.label"
														:value="item.value"
													></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											Criticité
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="6">
											<template>
												<el-checkbox @change="validateImpactReseauCDN" v-model="impactReseauCDN">Impact Réseau</el-checkbox>
											</template>
											<el-card v-show="cardImpactReseauCDN">
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Durée d'indisponibilité
													</el-col>
													<el-col :span="12">
														<el-input placeholder="HH:MM" v-model="form.indispoCDN"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Nombre d'utilisateurs
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.nbUtilisateurCDN"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Taux d'indisponibilité
													</el-col>
													<el-col :span="12">
														<el-input placeholder="%" v-model="form.tauxIndispoCDN"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														JFS :
													</el-col>
												</el-row>
											</el-card>

										</el-col>
										<el-col :span="6">
											<template>
												<el-checkbox @change="validateImpactClientCDN" v-model="impactClientCDN">Impact Client</el-checkbox>
											</template>
											<el-card v-show="cardImpactClientCDN">
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col style="text-align:center;">
														Durées d'indisponibilité (HH:MM)
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														DAB
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.dabCDN"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Internet client
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.internetClientCDN"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Internet mobile
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.internetMobileCDN"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														ETECE
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.eteceCDN"></el-input>
													</el-col>
												</el-row>
											</el-card>
										</el-col>
									</el-row>
									<el-form-item label="Impact" prop="description_impactCDN" style="margin-bottom:20px;">
										<el-input
											id="description_impactCDN"
											type="textarea"
											:autosize="{ minRows: 4, maxRows: 8 }"
											placeholder="Impact"
											v-model="form.description_impactCDN"
										></el-input>
									</el-form-item>
									<el-table :data="form.application_impactee" border style="margin-bottom:20px;">
										<el-table-column
											label="Application(s) impactée(s)"
											prop="application_impactee"
										>
											<template slot-scope="scope">
												<el-autocomplete
													placeholder="Application impactée"
													v-model="
														form.application_impactee[scope.$index]
															.display_name
													"
													:fetch-suggestions="getMatchingApplications"
													value-key="display_name"
													@select="appSelected"
												></el-autocomplete>
											</template>
										</el-table-column>
										<el-table-column width="60">
											<template slot="header">
												<el-button
													type="primary"
													icon="el-icon-plus"
													circle
													@click="handleCreateApp()"
												/>
											</template>
											<template slot-scope="scope">
												<el-button
													type="danger"
													icon="el-icon-delete"
													circle
													@click="handleDeleteApp(scope.$index)"
												/>
											</template>
										</el-table-column>
										<template slot="empty">
											<span class="arrayFormEmpty">Aucune donnée</span>
										</template>
									</el-table>
									</el-form-item>
								</el-tab-pane>
								<el-tab-pane label="BPF" name="tabBPF">
									<el-form-item v-show="formulaireBPF">
										<el-row :gutter="20">
										<el-col :span="6">
											<el-form-item label="Priorité" prop="priorite_idBPF">
												<el-select
													id="priorite_idBPF"
													v-model="form.priorite_idBPF"
												>
													<el-option
														v-for="item in remoteEnum.priorites"
														:key="item.id"
														:label="item.priorite"
														:value="item.id"
													></el-option>
												</el-select>
											</el-form-item>
										</el-col>

										<el-col :span="6">
											<el-form-item label="Impact Avéré" prop="impact_avereBPF">
												<el-select
													id="impact_avereBPF"
													v-model="valueImpactBPF"
												>
													<el-option
														v-for="item in optionsImpactAvere"
														:key="item.value"
														:label="item.label"
														:value="item.value"
													></el-option>
												</el-select>
											</el-form-item>
										</el-col>
										<el-col :span="6">
											Criticité
										</el-col>
									</el-row>
									<el-row :gutter="20">
										<el-col :span="6">
											<template>
												<el-checkbox @change="validateImpactReseauBPF" v-model="impactReseauBPF">Impact Réseau</el-checkbox>
											</template>
												<el-card v-show="cardImpactReseauBPF">
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															Durée d'indisponibilité
														</el-col>
														<el-col :span="12">
															<el-input placeholder="HH:MM" v-model="form.indispoBPF"></el-input>
														</el-col>
													</el-row>
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															Nombre d'utilisateurs
														</el-col>
														<el-col :span="12">
															<el-input v-model="form.nbUtilisateurBPF"></el-input>
														</el-col>
													</el-row>
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															Taux d'indisponibilité
														</el-col>
														<el-col :span="12">
															<el-input placeholder="%" v-model="form.tauxIndispoBPF"></el-input>
														</el-col>
													</el-row>
													<el-row :gutter="20" style="margin-bottom:10px;">
														<el-col :span="12">
															JFS : 
														</el-col>
													</el-row>
												</el-card>
										</el-col>
										<el-col :span="6">
											<template>
												<el-checkbox @change="validateImpactClientBPF" v-model="impactClientBPF">Impact Client</el-checkbox>
											</template>
											<el-card v-show="cardImpactClientBPF">
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col style="text-align:center">Durées d'indisponibilité (HH:MM)</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Logitelnet/SCAD
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.logitelBPF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														3955/3933
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.chiffreBPF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														DAB
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.dabBPF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														Progeliance net/EIPRO
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.progelianceBPF"></el-input>
													</el-col>
												</el-row>
												<el-row :gutter="20" style="margin-bottom:10px;">
													<el-col :span="12">
														ETECE
													</el-col>
													<el-col :span="12">
														<el-input v-model="form.eteceBPF"></el-input>
													</el-col>
												</el-row>
											</el-card>
										</el-col>
									</el-row>
									<el-form-item label="Impact" prop="description_impactBPF" style="margin-bottom:20px;">
										<el-input
											id="description_impactBPF"
											type="textarea"
											:autosize="{ minRows: 4, maxRows: 8 }"
											placeholder="Impact"
											v-model="form.description_impactBPF"
										></el-input>
									</el-form-item>
									<el-table :data="form.application_impactee" border style="margin-bottom:20px;">
										<el-table-column
											label="Application(s) impactée(s)"
											prop="application_impactee"
										>
											<template slot-scope="scope">
												<el-autocomplete
													placeholder="Application impactée"
													v-model="
														form.application_impactee[scope.$index]
															.display_name
													"
													:fetch-suggestions="getMatchingApplications"
													value-key="display_name"
													@select="appSelected"
												></el-autocomplete>
											</template>
										</el-table-column>
										<el-table-column width="60">
											<template slot="header">
												<el-button
													type="primary"
													icon="el-icon-plus"
													circle
													@click="handleCreateApp()"
												/>
											</template>
											<template slot-scope="scope">
												<el-button
													type="danger"
													icon="el-icon-delete"
													circle
													@click="handleDeleteApp(scope.$index)"
												/>
											</template>
										</el-table-column>
										<template slot="empty">
											<span class="arrayFormEmpty">Aucune donnée</span>
										</template>
									</el-table>
									</el-form-item>
								</el-tab-pane>
							</el-tabs>
						</el-form-item>
                	</el-card>
					<el-row :gutter="20">
						<el-col :span="12">
							<el-form-item label="Responsabilité" prop="responsabilite">
								<el-radio-group v-model="form.responsabilite_id">
									<div style="margin-bottom: 10px;">
										<el-radio 
											v-for="item in remoteEnum.responsabilite"
											:key="item.id"
											:label="item.nom"
											:value="item.id">
										</el-radio>
									</div>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="/">
								<el-input v-model="form.slash"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-form-item label="Commentaire" prop="commentaire">
						<el-input
						    id="commentaire"
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 8 }"
                            placeholder="Commentaire"
							v-model="form.commentaire"
						></el-input>
					</el-form-item>
                </el-card>
                <!-- Fin Infos générales incident -->
            </el-col>
        </el-row>

        <!-- Modal de confirmation de suppression d'une reférence problème -->
        <el-dialog
            title="Demande de confirmation"
            :visible.sync="delConfirmationModalVisible"
            width="40%"
            center
        >
            <span
                >Etes-vous sûr de vouloir supprimer la référence :
                {{ refToDelete }}</span
            >
            <span slot="footer" class="dialog-footer">
                <el-button @click="delConfirmationModalVisible = false"
                    >Annuler</el-button
                >
                <el-button type="danger" @click="confirmDelete()"
                    >Confirmer</el-button
                >
            </span>
        </el-dialog>
        <!-- Fin Modal de confirmation de suppression d'une reférence problème -->

        <!-- Modal de confirmation de suppression d'une application impactée -->
        <el-dialog
            title="Demande de confirmation"
            :visible.sync="delConfirmationModalVisibleApp"
            width="40%"
            center
        >
            <span
                >Etes-vous sûr de vouloir supprimer l'application :
                {{ refToDeleteApp }}</span
            >
            <span slot="footer" class="dialog-footer">
                <el-button @click="delConfirmationModalVisibleApp = false"
                    >Annuler</el-button
                >
                <el-button type="danger" @click="confirmDeleteApp()"
                    >Confirmer</el-button
                >
            </span>
        </el-dialog>
        <!-- Fin Modal de confirmation de suppression d'une application impactée-->

        <el-form-item style="text-align: center">
			<el-button v-show="!isCosip" type="danger">Annuler</el-button>
            <el-button v-if="isCosisp = !isCosip" type="primary" @click="onSubmit()"
                >Ajouter au COSIP</el-button
            >
            <el-button v-else type="primary" @click="onUpdate()"
                >Enregistrer les modifications</el-button
            >			
        </el-form-item>
    </el-form>
</template>

<script>
import Axios from 'axios';
import Vue from 'vue'
import CreateIncidentFormVue from './CreateIncidentForm.vue';
import { readFile, watch } from 'fs';
import { importSpecifier, thisTypeAnnotation } from 'babel-types';
import readXlsxFile from 'read-excel-file'
import { setTimeout } from 'timers';
import { constants } from 'crypto';
export default {
	mounted(){
		this.verifURL()  // Lance la focntion au "chargement" de la page
	},
    created() {
		this.getFieldsOptions();
		this.cosip();
		this.validateImpactReseauBPF()
		this.validateImpactClientBPF()
		this.validateImpactReseauBDDF()
		this.validateImpactClientBDDF()
		this.validateImpactReseauCDN()
		this.validateImpactClientCDN()
		this.verifCheckEnseignesImpactees()
		this.getCosip(this.reference)
    },

    props: {
        incident_id: {
            type: Number,
		},
		idCos: {
			type: Number,
		},
	},

    data() {
        return {

			url:'',
			checkedImpactBDDF: false,
			isCosip: false,


			optionsImpactAvere: [{
				value:'Elevé',
				label:'Elevé'
			},
			{
				value:'Moyen',
				label:'Moyen'
			},
			{
				value:'Faible',
				label:'Faible'
			}],

			value:'',

			valueImpactCDN:'',
			valueImpactBDDF:'',
			valueImpactBPF:'',

			radio:0,
            // Données énumérées venant de l'API
            remoteEnum: {
                priorites: [],
                statut: [],
                enseignes: [],
				application_impactee: [],
				responsabilite:[],
            },

            // Données du formulaire
            form: {
				references: [], //
				reference:'',
				probleme:'',
                incident_id: 0,
                is_faux_incident: false, //
                date_debut: '', //
                date_fin: null, //
                description: '', //
                cause: '',
                origine: '',
                action_retablissement: '',
                plan_action: '',
				description_impactCDN: '', //
				description_impactBDDF: '', //
				description_impactBPF: '', //
                description_contournement: 'Aucun contournement', //
                is_contournement: false, //
				priorite_idCDN: '', //
				priorite_idBDDF: '', //
				priorite_idBPF:'',
                enseigne_impactee: [],
				application_impactee: [],
				responsabilite_id:'',
				numChangement:'',
				mois_cosip:'',
				semaine_cosip:'',
				commentaire:'',
				slash:'',
				statut_id:'',
				date_detection:'',
				date_premiere_com:'',

				// Impact Réseau BDDF
				indispoBDDF:'',
				nbUtilisateurBDDF:'',
				tauxIndispoBDDF:'',

				// Impact Client BDDF
				logitelBDDF:'',
				chiffreBDDF:'',
				dabBDDF:'',
				progelianceBDDF:'',
				eteceBDDF:'',

				// Impact Réseau BPF
				indispoBPF:'',
				nbUtilisateurBPF:'',
				tauxIndispoBPF:'',

				// Impact Client BPF
				logitelBPF:'',
				chiffreBPF:'',
				dabBPF:'',
				progelianceBPF:'',
				eteceBPF:'',

				// Impact Réseau CDN
				indispoCDN:'',
				nbUtilisateurCDN:'',
				tauxIndispoCDN:'',

				// Impact Client
				dabCDN:'',
				internetClientCDN:'',
				internetMobileCDN:'',
				eteceCDN:''
			},

			rules:{  // Régles de validation des champs requis du formulaire
				date_debut: [
					{
						required:true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				description: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'blur',
					},
				],
				priorite_id: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				statut_id: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				enseigne_impactee: [
					{
						type: 'array',
						required: true,
						message: 'Aucune selection',
						trigger: 'change',
					},
				],
				mois_cosip: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				semaine_cosip: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				cause: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				origine: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				action_retablissement: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',						
					},
				],
				plan_action: [
					{
						required: true,
						message: 'Champ non rempli',
						trigger: 'change',						
					},
				],
				/*responsabilite: [
					{
						type: 'array',
						required: true,
						message: 'Aucune selection',
						trigger: 'change',						
					},
				],*/
				date_detection: [
					{
						required:true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],
				date_premiere_com: [
					{
						required:true,
						message: 'Champ non rempli',
						trigger: 'change',
					},
				],									
			},

            // Les lignes suivantes sont des variables nécessaires au modal de suppression
            delConfirmationModalVisible: false,
            delConfirmationModalVisibleApp: false,
            messageConfirmation: true,
            indexRefToDelete: 0,
            indexRefToDeleteApp: 0,
            refToDelete: '',
			refToDeleteApp: '',

			// Les lignes suivantes servent à gérer l'apparition de certains éléments lorsqu'on coche des checkbox
			cardImpactReseauBDDF:false,
			cardImpactClientBDDF:false,
			cardImpactReseauCDN:false,
			cardImpactClientCDN:false,
			cardImpactReseauBPF:false,
			cardImpactClientBPF:false,
			formulaireBPF:false,
			formulaireBDDF:false,
			formulaireCDN:false,

			activeName:null
        };
	},

    methods: {

		//Sauvegarde d'un incident dans le cosip via le formulaire 
	onSubmit(){
					// On récupère l'id de l'incident situé après le '=' dans l'url 
					var test = window.location.href.indexOf('=')
					if(test!=-1)
					{
						var idIncident=window.location.href.substr(test+1)
					}
					// On enregistre en base de données
					this.$http
						.post(
							'http://localhost:5000/api/add-cosip/'+idIncident,
							this.form
						)
						.then(result => {
							/* 
								Ajout du then pour attendre que l'API réponde 
								Car il se peut que ça se passe mal et qu'on envoi quand même un message de succés.
								De plus la fonction window.alert() stop tous les autres traitement JS
							*/
							// Ceci est un composent du module Element (Voir : https://element.eleme.io/#/fr-FR/component/message)
							this.$message({
								dangerouslyUseHTMLString: true,
								message:
									"<h1 style='font-family: arial'>L'enregistrement a bien été effectué.</h1>",
								type: 'success',
							});
							window.location.href = 'http://localhost:8080/#/cosip'
						});
						
		},
		//Méthode de récupération de l'url courante afin de modifier le bouton de validation du formulaire en "crétation" ou "Modification"
		verifURL(){
			this.url = window.location.href
			console.log("isCosip: "+ this.isCosip)
			console.log("L'URL de la page est: " + this.url)
			if(this.url == "http://localhost:8080/#/cosip"){
				this.isCosip = true
				console.log("isCosip: "+ this.isCosip)
			}
		},
		// Méthode qui permet d'afficher ou non la card impact réseau BPF
		validateImpactReseauBPF(){
			if(this.impactReseauBPF==true)
			{
				console.log("Coché")
				this.cardImpactReseauBPF=true;
			}
			else{
				console.log("pas coché")
				this.cardImpactReseauBPF=false;
			}
		},

		// Méthode qui permet d'afficher ou non la card impact client BPF
		validateImpactClientBPF(){
			if(this.impactClientBPF==true)
			{
				console.log("Coché")
				this.cardImpactClientBPF=true;
			}
			else{
				console.log("pas coché")
				this.cardImpactClientBPF=false;
			}
		},

		// Méthode qui permet d'afficher ou non la card impact réseau BDDF
		validateImpactReseauBDDF(){
			if(this.impactReseauBDDF==true)
			{
				console.log("Coché")
				this.cardImpactReseauBDDF=true;
			}
			else{
				console.log("pas coché")
				this.cardImpactReseauBDDF=false;
			}
		},

		// Méthode qui permet d'afficher ou non la card impact client BDDF
		validateImpactClientBDDF(){
			if(this.impactClientBDDF==true)
			{
				console.log("Impact Client coché")
				this.cardImpactClientBDDF=true;
			}
			else{
				console.log("pas coché")
				this.cardImpactClientBDDF=false;
			}
		},

		// Méthode qui permet d'afficher ou non la card impact réseau CDN 
		validateImpactReseauCDN()
		{
			if(this.impactReseauCDN==true)
			{
				console.log("Coché")
				this.cardImpactReseauCDN=true;
			}
			else{
				console.log("pas coché")
				this.cardImpactReseauCDN=false;
			}
		},

		// Méthode qui permet d'afficher ou non la card impact client CDN
		validateImpactClientCDN()
		{
			if(this.impactClientCDN==true)
			{
				console.log("Impact Client coché")
				this.cardImpactClientCDN=true;
			}
			else{
				console.log("pas coché")
				this.cardImpactClientCDN=false;
			}
		},

		// Méthode qui vérifie si les checkbox BDDF/CDN/BPF sont cochées et qui active les cards en fontion de l'état des checkbox
		verifCheckEnseignesImpactees()
		{
			if(this.form.enseigne_impactee[0]==1 || this.form.enseigne_impactee[1]==1 || this.form.enseigne_impactee[2]==1)
			{
				console.log("BDDF")
				this.formulaireBDDF=true
				this.activeName="tabBDDF"
			}
			else
			{
				this.formulaireBDDF=false
			}
			
			if(this.form.enseigne_impactee[0]==2 || this.form.enseigne_impactee[1]==2 || this.form.enseigne_impactee[2]==2)
			{
				console.log("CDN")
				this.formulaireCDN=true
				this.activeName="tabCDN"
			}
			else
			{
				this.formulaireCDN=false
			}	

			if(this.form.enseigne_impactee[0]==3 || this.form.enseigne_impactee[1]==3 || this.form.enseigne_impactee[2]==3)
			{
				console.log("BPF")
				this.formulaireBPF=true
				this.activeName="tabBPF"

			}
			else
			{
				this.formulaireBPF=false
			}
		},

		cosip(){
			// On récupère l'id de l'incident situé après le '=' dans l'url 
			var test = window.location.href.indexOf('=')
			if(test!=-1)
			{
				var idIncident=window.location.href.substr(test+1)
			}

			// On récupère les informations de l'incident à dupliquer et on les affiche dans les champs correspondant
			if(idIncident!=undefined)
			{
				Axios.get('http://localhost:5000/api/main-courante/' + idIncident).then(
					response => {
						console.log(response.data[0].statut)
						this.form.incident_id=idIncident
						this.form.description=response.data[0].description
						//this.form.description_impact=response.data[0].description_impact
						this.form.priorite_id=response.data[0].priorite
						this.form.date_debut = response.data[0].date_debut;
                		this.form.date_fin = response.data[0].date_fin;
                		this.form.statut_id = response.data[0].statut;
						this.form.is_faux_incident = response.data[0].is_faux_incident
                    	? true
                    	: false;
                		this.form.is_contournement = response.data[0].is_contournement
                    	? true
                    	: false;
                		this.form.description_contournement = response.data[0].description_contournement
                		this.form.enseigne_impactee = [];
						this.form.references = [];
						this.form.application_impactee = [];
						this.form.plan_action=response.data[0].plan_action
						this.form.origine=response.data[0].origine
						this.form.action_retablissement=response.data[0].action_retablissement
						this.form.date_premiere_com = response.data[0].date_premier_com;
						this.form.cause = response.data[0].cause;
						//this.form.date_detection = response.data[0].date_detection;
						const dateDebut = new Date(response.data[0].date_debut);
						var numeroMois = dateDebut.getMonth()+1

						this.form.description_impactCDN=response.data[0].description_impact
						this.form.description_impactBDDF=response.data[0].description_impact
						this.form.description_impactBPF=response.data[0].description_impact

						this.form.priorite_idCDN=response.data[0].priorite
						this.form.priorite_idBDDF=response.data[0].priorite
						this.form.priorite_idBPF=response.data[0].priorite
						


						// Ajout d'un 0 devant le mois si celui-ci est inférieur strict à 10
						if(numeroMois<10)
						{
							numeroMois="0"+numeroMois
						}

						this.form.mois_cosip=dateDebut.getFullYear()+"/"+numeroMois;

						//Calcul du numéro de la semaine en fonction de la date de début
						var jour = dateDebut.getDay();
						dateDebut.setDate(dateDebut.getDate() - (jour + 6) % 7 + 3);
						var ms = dateDebut.valueOf();
						dateDebut.setMonth(0)
						dateDebut.setDate(4)
						var semaineCosip = Math.round((ms - dateDebut.valueOf()) / (7*864e5))+1
						//Fin du calcul

						this.form.semaine_cosip=dateDebut.getFullYear()+"/S"+semaineCosip

						if(response.data[0].statut==5)
						{
							this.form.statut_id="Terminé"
						}

						for (const ens_id of response.data[0].id_enseigne.split('/')) {
							this.form.enseigne_impactee.push(parseInt(ens_id));
						}

						for (
							let index = 0;
							index < response.data[0].reference_id.split('/').length;
							index++
						) {
							const id = response.data[0].reference_id.split('/')[index];
							const ref = response.data[0].reference.split('/')[index];
							this.form.references.push({
								reference_id: id,
								reference: ref,
							});
						}
						
						for (const app of response.data[0].display_name.split('|||')) {
							console.log({display_name: app });
							
							this.form.application_impactee.push({display_name: app })
						}
						console.log(this.form.application_impactee);
						})
				}
		},

		//Méthode GetCosip() pour l'update d'un incdent déjà dans le cosip
		//On récupére les données du tableau et on les incères dans le formulaire 
		getCosip(idCos){
			console.log("Début de la requête " + idCos)		
			Axios.get('http://localhost:5000/api/cosip/'+ idCos).then(
				response => {
					this.form.description=response.data[0].description;
					this.form.statut_id=response.data[0].statut_id;
					console.log(response.data[0].statut)
					this.form.cause=response.data[0].cause;
					this.form.origine=response.data[0].origine;
					this.form.date_detection=response.data[0].date_detection;
					this.form.date_premiere_com=response.data[0].date_premier_com;
					this.form.action_retablissement=response.data[0].action_retablissement;
					this.form.plan_action=response.data[0].plan_action;
					this.form.date_debut=response.data[0].date_debut;	
					this.form.impactReseauCDN=response.data[0].description_impact
					const dateDebut = new Date(response.data[0].date_debut);
					var numeroMois = dateDebut.getMonth()+1					
					
					//Calcul du numéro de la semaine en fonction de la date de début
					var jour = dateDebut.getDay();
					dateDebut.setDate(dateDebut.getDate() - (jour + 6) % 7 + 3);
					var ms = dateDebut.valueOf();
					dateDebut.setMonth(0)
					dateDebut.setDate(4)
					var semaineCosip = Math.round((ms - dateDebut.valueOf()) / (7*864e5))+1
					//Fin du calcul

					this.form.semaine_cosip=dateDebut.getFullYear()+"/S"+semaineCosip

											// Ajout d'un 0 devant le mois si celui-ci est inférieur strict à 10
						if(numeroMois<10)
						{
							numeroMois="0"+numeroMois
						}

						this.form.mois_cosip=dateDebut.getFullYear()+"/"+numeroMois;
						
				})
		},

        // Cette méthode est lancée quand un champ d'appli impacté s'est vu selectionné une appli parmis les propositions
        // Quand tel est le cas, on insere les données de l'appli (CI et trigramme) pour pouvoir la relier en BDD
        appSelected(appSelection){
            const appIndex = this.form.application_impactee.map(el => el.display_name).indexOf(appSelection.display_name)
            this.form.application_impactee[appIndex] = appSelection
        },

        ////////////////////////////////////////
        // Il faudra voir pour dedoublonner ces fonctions mais c'est pas urgent
        ////////////////////////////////////////
		// Les handler pour la table et le modal des references
		////////////////////////////////////////

        confirmDelete() {
            this.form.references.splice(this.indexToDelete, 1);
            this.delConfirmationModalVisible = false;
        },
        handleDelete(index) {
            this.indexToDelete = index;
            this.refToDelete = this.form.references[index].reference;
            this.delConfirmationModalVisible = true;
        },
        handleCreate() {
            this.form.references.push({ reference: '' });
        },

        // Les handler pour la table et le modal des applis impactees
        confirmDeleteApp() {
            this.form.application_impactee.splice(this.indexRefToDeleteApp, 1);
            this.delConfirmationModalVisibleApp = false;
        },
        handleDeleteApp(index) {
            this.indexRefToDeleteApp = index;
            this.refToDeleteApp = this.form.application_impactee[
                index
            ].application_impactee;
            this.delConfirmationModalVisibleApp = true;
        },
        handleCreateApp() {
            this.form.application_impactee.push({ display_name: '' });
        },
        ////////////////////////////////////////

        // Méthode de récupération de tout les champs énumérées
        getFieldsOptions() {
            // Obtention des prioritées
            this.$http
                .get('http://localhost:5000/api/incidents/priorite')
                .then(response => {
                    this.remoteEnum.priorites = response.data;
                });

            // Obtention des statuts
            this.$http
                .get('http://localhost:5000/api/incidents/statut')
                .then(response => {
                    this.remoteEnum.statut = response.data;
                });

            // Obtention des enseignes
            this.$http
                .get('http://localhost:5000/api/enseignes')
                .then(response => {
                    this.remoteEnum.enseignes = response.data;
                });

            // Obtention des application
            this.$http
                .get('http://localhost:5000/api/applications')
                .then(response => {
                    this.remoteEnum.applications = response.data;
				});
				
			this.$http
				.get('http://localhost:5000/api/incidents/entite')
				.then(response => {
					this.remoteEnum.responsabilite = response.data;
				});
        },

        ////////////////////////////////////////
        // Ces 2 fonctions sont nécessaire pour afficher les application dans le champ el-autocomplete
        // Voir "querySearch" et "createFilter" dans https://element.eleme.io/#/en-US/component/input#autocomplete
        ////////////////////////////////////////
        // Récupère les applis qui match avec la saisie de l'utilisateur
        getMatchingApplications(requete, retour) {
            if (requete.length > 1) {
                var apps = this.remoteEnum.applications;
                var results = requete
                    ? apps.filter(this.createAppFilter(requete))
                    : apps;
                retour(results);
                //console.log(retour);
            } else {
                retour([{ nom: '' }]);
            }
        },
        // Crée le filtre nécessaire à matcher les applis
        createAppFilter(queryString) {
            return apps => {
                return (
                    apps.code_irt
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) != -1 ||
                    apps.trigramme
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) != -1 ||
                    apps.nom.toLowerCase().indexOf(queryString.toLowerCase()) !=
                        -1 ||
                    apps.libelle_court
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) != -1
                );
            };
		},
        ////////////////////////////////////////

	},
	watch: {
        idCos: function() {
            this.getCosip(this.idCos);
        },
    },
	
};
</script>

<!-- 
	Ici on met le CSS du component mais en SASS (pas SCSS)
	Voir : https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
	Ou : https://sass-lang.com/guide
-->
<style lang="sass">
.el-form
	margin: 20px
	text-align: left

.card-header, .cell .el-input
	margin: 0

.el-card
	margin-bottom: 20px

.el-checkbox-group
	text-align: center

.el-date-editor.el-input, .el-select, .el-autocomplete
	width: 100%

label.el-form-item__label
	line-height: 15px

th:first-child .cell
	&::before
		content: "* "
		color: red

</style>