import userDinoLevelsUtils, { UserDinoLevelsPurpose } from 'utils/gameFiles/user-dino-levels-utils.ts';

const existingIniSettings = `[/Script/ShooterGame.ShooterGameMode]
bAllowFlyerSpeedLeveling=true
bPvEAllowTribeWar=true
bPvEAllowTribeWarCancel=false
bUseSingleplayerSettings=false
ServerAutoForceRespawnWildDinosInterval=4
bAllowCustomRecipes=true
CustomRecipeEffectivenessMultiplier=1
CustomRecipeSkillMultiplier=1
bPassiveDefensesDamageRiderlessDinos=false
GlobalPoweredBatteryDurabilityDecreasePerSecond=4
bIncreasePvPRespawnInterval=true
IncreasePvPRespawnIntervalCheckPeriod=300
IncreasePvPRespawnIntervalMultiplier=2
IncreasePvPRespawnIntervalBaseAmount=60
ResourceNoReplenishRadiusPlayers=1.000000
ResourceNoReplenishRadiusStructures=1.000000
GlobalSpoilingTimeMultiplier=0.500000
GlobalItemDecompositionTimeMultiplier=1.000000
GlobalCorpseDecompositionTimeMultiplier=1.000000
UseCorpseLifeSpanMultiplier=2.000000
CropGrowthSpeedMultiplier=2.000000
CropDecaySpeedMultiplier=2.000000
PoopIntervalMultiplier=1.500000
DinoHarvestingDamageMultiplier=5.00
PlayerHarvestingDamageMultiplier=2.00
DinoTurretDamageMultiplier=1.00
BabyFoodConsumptionSpeedMultiplier=1.00
bUseCorpseLocator=true
bAllowPlatformSaddleMultiFloors=true
bAllowUnlimitedRespecs=true
bDisableStructurePlacementCollision=true
SupplyCrateLootQualityMultiplier=4.00
FishingLootQualityMultiplier=2.00
CraftingSkillBonusMultiplier=5.0
bAutoUnlockAllEngrams=true
LayEggIntervalMultiplier=3.800000
MatingIntervalMultiplier=0.010000
MatingSpeedMultiplier=1.500000
EggHatchSpeedMultiplier=20.000000
BabyMatureSpeedMultiplier=180.000000
BabyImprintingStatScaleMultiplier=1.750000
BabyImprintAmountMultiplier=1.000000
BabyCuddleIntervalMultiplier=0.010000
BabyCuddleGracePeriodMultiplier=1.000000
BabyCuddleLoseImprintQualitySpeedMultiplier=1.000000
MaxNumberOfPlayersInTribe=8
bAutoPvETimer=false
bGenesisUseStructuresPreventionVolumes=True
StructureDamageRepairCoolDown=180
KillXPMultiplier=15.00
CraftXPMultiplier=10.00
FuelConsumptionIntervalMultiplier=0.750000
PlayerBaseStatMultipliers[0]=1.00 # Health - base stats for when a player spawns
PlayerBaseStatMultipliers[1]=1.00 # Stamina - base stats for when a player spawns
PlayerBaseStatMultipliers[2]=1.00 # Torpidity - base stats for when a player spawns
PlayerBaseStatMultipliers[3]=1.00 # Oxygen - base stats for when a player spawns
PlayerBaseStatMultipliers[4]=1.00 # Food - base stats for when a player spawns
PlayerBaseStatMultipliers[5]=1.00 # Water - base stats for when a player spawns
PlayerBaseStatMultipliers[6]=1.00 # Unused stat (temperature)
PlayerBaseStatMultipliers[7]=1.00 # Weight - base stats for when a player spawns
PlayerBaseStatMultipliers[8]=1.00 #100% (Base cannot be increased) - base stats for when a player spawns
PlayerBaseStatMultipliers[9]=1.00 #100% (Base cannot be increased) - base stats for when a player spawns
PlayerBaseStatMultipliers[10]=1.00 #100% (Base cannot be increased) - base stats for when a player spawns
PlayerBaseStatMultipliers[11]=1.00 #100% (Base cannot be increased) - base stats for when a player spawns
PerLevelStatsMultiplier_Player[0]=3.75 # Health - changed per level point
PerLevelStatsMultiplier_Player[1]=4.00 # Stamina - changed per level point
PerLevelStatsMultiplier_Player[3]=10.00 # Oxygen - changed per level point
PerLevelStatsMultiplier_Player[4]=20.00 # Food - changed per level point
PerLevelStatsMultiplier_Player[5]=20.00 # Water - changed per level point
PerLevelStatsMultiplier_Player[6]=1.00 # Unused Stat (temperature)
PerLevelStatsMultiplier_Player[7]=35.00 # Weight - changed per level point
PerLevelStatsMultiplier_Player[8]=3.75 # Melee Damage - changed per level point
PerLevelStatsMultiplier_Player[9]=5.00 # Speed - changed per level point
PerLevelStatsMultiplier_Player[10]=10.00 # Fortitude - changed per level point
PerLevelStatsMultiplier_Player[11]=3.75 # Crafting Speed - changed per level point
PerLevelStatsMultiplier_DinoTamed[0]=5.00 # Health changed per level point
PerLevelStatsMultiplier_DinoTamed[1]=5.00 # Stamina changed per level point
PerLevelStatsMultiplier_DinoTamed[3]=5.00 # Oxygen changed per level point
PerLevelStatsMultiplier_DinoTamed[4]=10.00 # Food changed per level point
PerLevelStatsMultiplier_DinoTamed[7]=17.50 # Weight changed per level point
PerLevelStatsMultiplier_DinoTamed[8]=5.00 # Melee Damage changed per level point
PerLevelStatsMultiplier_DinoTamed[9]=2.25 # Speed changed per level point
PerLevelStatsMultiplier_DinoTamed_Add[0]=10.0 # Health added when tamed
PerLevelStatsMultiplier_DinoTamed_Add[1]=6.0 # Stamina added when tamed
PerLevelStatsMultiplier_DinoTamed_Add[3]=10.0 # Oxygen added when tamed
PerLevelStatsMultiplier_DinoTamed_Add[4]=10.0 # Food added when tamed
PerLevelStatsMultiplier_DinoTamed_Add[7]=25.0 # Weight added when tamed
PerLevelStatsMultiplier_DinoTamed_Add[8]=7.0 # Melee Damage added when tamed
PerLevelStatsMultiplier_DinoTamed_Add[9]=4.5 # Speed added when tamed
PerLevelStatsMultiplier_DinoTamed_Affinity[0]=0.44
PerLevelStatsMultiplier_DinoTamed_Affinity[1]=1.00
PerLevelStatsMultiplier_DinoTamed_Affinity[3]=1.00
PerLevelStatsMultiplier_DinoTamed_Affinity[4]=1.00
PerLevelStatsMultiplier_DinoTamed_Affinity[7]=1.00
PerLevelStatsMultiplier_DinoTamed_Affinity[8]=0.44
PerLevelStatsMultiplier_DinoTamed_Affinity[9]=1.00
PerLevelStatsMultiplier_DinoWild[0]=1.25
PerLevelStatsMultiplier_DinoWild[1]=0.75
PerLevelStatsMultiplier_DinoWild[3]=1.00
PerLevelStatsMultiplier_DinoWild[4]=1.00
PerLevelStatsMultiplier_DinoWild[6]=1.00
PerLevelStatsMultiplier_DinoWild[7]=1.00
PerLevelStatsMultiplier_DinoWild[8]=2.00
PerLevelStatsMultiplier_DinoWild[9]=1.25
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_RawMeat_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_RawPrimeMeat_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_RawMeat_Fish_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Chitin_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Metal_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_MetalIngot_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Wood_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Thatch_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Obsidian_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_AnglerGel_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_BlackPearl_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Silicon_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_Berry_Narcoberry_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_Berry_Amarberry_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_Berry_Azulberry_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_Berry_Mejoberry_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_Berry_Stimberry_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_Berry_Tintoberry_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Fibers_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Stone_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Charcoal_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Hide_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Keratin_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Sap_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Crystal_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Electronics_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Flint_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Polymer_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Polymer_Organic_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Gunpowder_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Oil_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Pelt_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_RawSalt_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Sand_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_Fertilizer_Compost_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Sparkpowder_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_SpoiledMeat_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_ChitinPaste_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Sulfur_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Gasoline_C",Quantity=(MaxItemQuantity=10000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_SubstrateAbsorbent_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemResource_Propellant_C",Quantity=(MaxItemQuantity=1000.0, bIgnoreMultiplier=true))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_CookedMeat_C",Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_CookedMeat_Fish_C",Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_RawPrimeMeat_Fish_C",Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_CookedPrimeMeat_Fish_C",Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_RawMutton_Fish_C",Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_CookedPrimeMeat_C",Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_RawPrimeMeat_C",Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_DinoPoopSmall_C", Quantity=(MaxItemQuantity=100,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_DinoPoopMedium_C", Quantity=(MaxItemQuantity=100,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_DinoPoopMassive_C", Quantity=(MaxItemQuantity=100,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_DinoPoopLarge_C", Quantity=(MaxItemQuantity=100,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemConsumable_RawMutton_C", Quantity=(MaxItemQuantity=1000,bIgnoreMultiplier=True))
ConfigOverrideItemMaxQuantity=(ItemClassString="PrimalItemAmmo_AdvancedRifleBullet_C", Quantity=(MaxItemQuantity=10000,bIgnoreMultiplier=True))
# DinoSpawnWeightMultipliers=(
#  DinoNameTag=Beaver, # Dinosaur tage
#  SpawnWeightMultiplier=2.5, # Weight factor
#  OverrideSpawnLimitPercentage=true, # Used for the next line to work
#  SpawnLimitPercentage=0.5 # Means the specified dino will only be selected to spawn 50% of the time
DinoSpawnWeightMultipliers=(DinoNameTag=Beaver,SpawnWeightMultiplier=2.5,OverrideSpawnLimitPercentage=false,SpawnLimitPercentage=0.25)
DinoSpawnWeightMultipliers=(DinoNameTag=Doed,SpawnWeightMultiplier=2.5,OverrideSpawnLimitPercentage=false,SpawnLimitPercentage=0.25)
DinoSpawnWeightMultipliers=(DinoNameTag=Gigant,SpawnWeightMultiplier=1.66,OverrideSpawnLimitPercentage=false,SpawnLimitPercentage=0.25)
DinoSpawnWeightMultipliers=(DinoNameTag=Bigfoot,SpawnWeightMultiplier=3.33,OverrideSpawnLimitPercentage=false,SpawnLimitPercentage=0.25)
DinoSpawnWeightMultipliers=(DinoNameTag=Quetz,SpawnWeightMultiplier=2.33,OverrideSpawnLimitPercentage=false,SpawnLimitPercentage=0.25)
DinoSpawnWeightMultipliers=(DinoNameTag=Anky,SpawnWeightMultiplier=2.5,OverrideSpawnLimitPercentage=false,SpawnLimitPercentage=0.25)
DinoSpawnWeightMultipliers=(DinoNameTag=Rex,SpawnWeightMultiplier=2.0,OverrideSpawnLimitPercentage=false,SpawnLimitPercentage=0.25)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_ElementDust_C",Multiplier=1.33)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Crystal_C",Multiplier=1.33)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Electronics_C",Multiplier=2.66)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Keratin_C",Multiplier=2.66)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Chitin_C",Multiplier=2.66)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_BlackPearl_C",Multiplier=2.33)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Silicon_C",Multiplier=2.33)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Charcoal_C",Multiplier=3.33)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Oil_C",Multiplier=1.66)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_SquidOil_C",Multiplier=7.66)
HarvestResourceItemAmountClassMultipliers=(ClassName="PrimalItemResource_Polymer_Organic_C",Multiplier=3.33)`;

/**
 * Player levels must be before dino levels
 */
const playerLevels = userDinoLevelsUtils({
  numberOfLevels: 135,
  baseLevels: 104,
  growthPerLevel: 0.0625,
  purpose: UserDinoLevelsPurpose.PLAYER,
});

/**
 * Dino levels must be after player levels
 */
const dinoLevels = userDinoLevelsUtils({
  numberOfLevels: 100,
  baseLevels: 0,
  growthPerLevel: 0.093,
  purpose: UserDinoLevelsPurpose.DINO,
});

await Bun.write(`${import.meta.dir}/game.ini`, `${existingIniSettings}\n${playerLevels}\n${dinoLevels}`);
