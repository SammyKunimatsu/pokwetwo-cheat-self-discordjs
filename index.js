require('dotenv').config();
const axios = require("axios");
const { Client } = require('discord.js-selfbot-v13');
const config = require("./config.json");

let pokemon_pseudo_lendarios = [
    // Primeira geração
    "dragonite", // #149
  
    // Segunda geração
    "tyranitar", // #248
  
    // Terceira geração
    "salamence", // #373
    "metagross", // #376
  
    // Quarta geração
    "garchomp", // #445
  
    // Quinta geração
    "hydreigon", // #635
  
    // Sexta geração
    "goodra", // #706
  
    // Sétima geração 
    "kommo-o" ,// #784 
  
     //Oitava geração 
     "dragapult" ,//#887 
  
  ];

  // Array com todos os Pokémon lendários até a nona geração
let pokemon_lendarios = [
    // Primeira geração
    "articuno", // #144
    "zapdos", // #145
    "moltres", // #146
    "mewtwo", // #150
  
    // Segunda geração
    "raikou", // #243
    "entei", // #244
    "suicune", // #245
    "lugia", // #249
    "ho-Oh", // #250
  
    // Terceira geração
    "regirock", // #377
    "regice", // #378
    "registeel", // #379
    "latias", // #380
    "latios", // #381
    "kyogre", // #382
    "groudon", // #383
    "rayquaza", // #384
  
    // Quarta geração
    "uxie", // #480
    "mesprit", // #481
    "azelf", // #482
    "dialga", // #483
    "palkia", // #484
    "heatran", // #485
    "regigigas", // #486
    "giratina", // #487
    "cresselia", // #488
  
    // Quinta geração
    "cobalion", // #638
    "terrakion", // #639
    "virizion", // #640
    "tornadus", // #641
    "thundurus", // #642
    "reshiram", // #643
    "zekrom", // #644
    "landorus", // #645
    "kyurem", // #646
  
    // Sexta geração
    "xerneas", // #716
    "yveltal", // #717
    "zygarde" ,// #718
  
    // Sétima geração 
    "type-null" ,// #772 
    "silvally" ,// #773 
    "tapu koko" ,// #785 
    "tapu lele" ,// #786 
    "Tapu bulu" ,// #787 
    "Tapu fini" ,//#788 
     "cosmog" ,//#789 
     "cosmoem" ,//#790 
     "solgaleo" ,//#791 
     "lunala" ,//#792 
     "nihilego" ,//#793 
     "buzzwole" ,//#794 
     "pheromosa" ,//#795 
     "xurkitree" ,//#796 
     "celesteela" ,//#797 
     "kartana" ,//#798 
     "guzzlord" ,//#799 
     "necrozma" ,//#800 
  
     //Oitava geração 
     "zacian" ,//#888 
     "zamazenta" ,//#889 
     "eternatus" ,//#890 
  
     //Nona geração (ainda não confirmada oficialmente) 
     "regieleki" ,//#894 
     "regidrago" ,//#895 
     "glastrier" ,//#896 
     "spectrier" ,//#897 
     "calyrex" //#898 
  
  ];

  // Array com todos os Pokémon míticos até a nona geração
let pokemon_miticos = [
    // Primeira geração
    "mew", // #151
  
    // Segunda geração
    "celebi", // #251
  
    // Terceira geração
    "jirachi", // #385
    "deoxys", // #386
  
    // Quarta geração
    "phione", // #489
    "manaphy", // #490
    "darkrai", // #491
    "shaymin", // #492
    "arceus", // #493
  
    // Quinta geração
    "victini", // #494
    "keldeo", // #647
    "meloetta", // #648
    "genesect", // #649
  
    // Sexta geração
    "diancie", // #719
    "hoopa", // #720
    "volcanion", // #721
  
    // Sétima geração 
    "magearna" ,// #801 
    "marshadow" ,// #802 
    "zeraora" ,// #807 
    "meltan" ,// #808 
    "melmetal" ,// #809 
  
     //Oitava geração 
     "zarude" ,//#893 
     "zeraora" ,//#894 
  
     //Nona geração (ainda não confirmada oficialmente) 
     "dada" ,//#899 
     "zaru" ,//#900 
  
  ];

const client = new Client({
	// See other options here
	// https://discordjs-self-v13.netlify.app/#/docs/docs/main/typedef/ClientOptions
	// All partials are loaded automatically
	checkUpdate: false
});

client.on('ready', async () => {
  console.log(`Hack Poketwo ativado na conta de: ${client.user.username}`);
})

client.on("messageCreate", async(message) => {

	if(!config.channels.includes(message?.channel?.id)) return;
	if(message?.member?.user?.id !== "874910942490677270") return;
    

    if (message?.components?.length) {
        const button = message?.components?.[0]?.components?.[0];
        try{
            const pokemonJson = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${`${button?.emoji?.name}`.replace(/_/gi, "")}`)

            if(config.blackList.includes(`${pokemonJson?.data?.pokemon?.name}`.toLowerCase())) return;

            if(!config.allPkmn){
                if(!config.pseudoLegenOnly && !config.legenOnly && !config.miticoOnly) return;
                if(config.pseudoLegenOnly && pokemon_pseudo_lendarios.includes(`${pokemonJson?.data?.pokemon?.name}`.toLowerCase())){
                    message.channel.send(`<@716390085896962058> c ${pokemonJson?.data?.pokemon?.name}`)
                    console.log(`Pokemon pego: ${pokemonJson?.data?.pokemon?.name}`) 
                }
                if(config.legenOnly && pokemon_lendarios.includes(`${pokemonJson?.data?.pokemon?.name}`.toLowerCase())){
                    message.channel.send(`<@716390085896962058> c ${pokemonJson?.data?.pokemon?.name}`)
                    console.log(`Pokemon pego: ${pokemonJson?.data?.pokemon?.name}`)
                }
                if(config.miticoOnly && pokemon_miticos.includes(`${pokemonJson?.data?.pokemon?.name}`.toLowerCase())){
                    message.channel.send(`<@716390085896962058> c ${pokemonJson?.data?.pokemon?.name}`)
                    console.log(`Pokemon pego: ${pokemonJson?.data?.pokemon?.name}`)
                }
                return;
            }

            message.channel.send(`<@716390085896962058> c ${pokemonJson?.data?.pokemon?.name}`)
            console.log(`Pokemon pego: ${pokemonJson?.data?.pokemon?.name}`)
        }catch(err){
            await message.clickButton(button);
        }
    }else{
        if(message.type === "REPLY"){
            const embed =  message?.embeds?.[0]
            const pokemonName = embed?.title?.split?.("-")?.[1]?.trim?.();
            if(!pokemonName) return;
            if(config.blackList.includes(`${pokemonName}`.toLowerCase())) return;

            if(!config.allPkmn){
                if(!config.pseudoLegenOnly && !config.legenOnly && !config.miticoOnly) return;
                if(config.pseudoLegenOnly && pokemon_pseudo_lendarios.includes(`${pokemonName}`.toLowerCase())){
                    message.channel.send(`<@716390085896962058> c ${pokemonName}`)
                    console.log(`Pokemon pego: ${pokemonName}`) 
                }
                if(config.legenOnly && pokemon_lendarios.includes(`${pokemonName}`.toLowerCase())){
                    message.channel.send(`<@716390085896962058> c ${pokemonName}`)
                    console.log(`Pokemon pego: ${pokemonName}`)
                }
                if(config.miticoOnly && pokemon_miticos.includes(`${pokemonName}`.toLowerCase())){
                    message.channel.send(`<@716390085896962058> c ${pokemonName}`)
                    console.log(`Pokemon pego: ${pokemonName}`)
                }
                return;
            }
            message.channel.send(`<@716390085896962058> c ${pokemonName}`)
            console.log(`Pokemon pego: ${pokemonName}`)
        }
    }

})

client.login(process.env.DISCORD_TOKEN);
  
process.on('unhandledRejection', (err) => {
  Error.captureStackTrace(err, null);
    console.log(`unhandledRejection:\n${err.stack}`)
  });

  process.on("uncaughtException", (err) => {
    Error.captureStackTrace(err, null);
    console.log(`uncaughtException:\n${err.stack}`)
  })
  process.on('beforeExit', (code) => {
    console.log('ignore that log: beforeExit');
    console.log(`ignore that log: beforeExit\n\n${code}`)
  });
  process.on('exit', (code) => {
    console.log('ignore that log: exit');
    console.log(`ignore that log: exit\n\n${code}`)
  });
  process.on('warning', (warn) => {
    console.log(`Warning:\n[${warn.name}] - ${warn.message}\n${warn.stack}`)
  })
