import Greffes from '@/assets/fixtures/codesGreffes.json'
import Filters from '@/components/mixins/filters.js'
import Formating from '@/components/mixins/formating.js'

function nameFromCodeGreffe(code) {
  return Greffes.listeGreffes[code]
}

function concatIfExist(base, thisExist, additionIfYes, additionIfNo) {
  if (thisExist) {
    return base.concat('', additionIfYes)
  } else {
    return base.concat('', additionIfNo)
  }
}

function FixeOrVariable(letter) {
  if (letter == 'F') {
    return 'Capital fixe'
  } else if (letter == 'V') {
    return 'Capital variable'
  }
  return letter
}

function PrincipaleOrSecondaire(letter) {
  if (letter == 'P') {
    return 'Principale'
  } else if (letter == 'S') {
    return 'Secondaire'
  }
  return letter
}

function RNCSDeviseSentence (infos) {
  let sentence = `${Filters.filters.ifExist(Filters.filters.frenchNumberFormat(infos.capital))}`

  sentence = concatIfExist(`${FixeOrVariable(infos.type_capital)} : `, infos.type_capital, sentence,'')
  sentence = concatIfExist(sentence, infos.devise, ` ${infos.devise}`,', de devise non précisée')
  sentence = concatIfExist(sentence, infos.capital_actuel, `. Le capital actuel est de ${infos.capital_actuel}`,'')

  return sentence
}

function RNCSLastModification (infos) {
  let sentence = concatIfExist('', infos.libelle_derniere_modification, infos.libelle_derniere_modification, '')
  sentence = concatIfExist(sentence, (infos.libelle_derniere_modification && infos.date_derniere_modification),', ', '')
  sentence = concatIfExist(sentence, infos.date_derniere_modification, `le ${infos.date_derniere_modification}.`, '')

  return sentence
}

function RNCSConcatGreffe (infos) {
  let sentence = infos.nom_greffe
  sentence = concatIfExist(sentence, infos.code_greffe, ` (Code : ${infos.code_greffe})`, '')

  return sentence
}

function RNCSConcatName (person) {

  let name = Filters.filters.upperCase(person.nom_patronyme)

  return concatIfExist(name, person.prenoms, `, ${person.prenoms}`, '')
}

function RNCSConcatAddress(infos) {
  let address = concatIfExist('', infos.adresse_code_postal, infos.adresse_code_postal, '')
  address = concatIfExist(address, (infos.adresse_code_postal && infos.adresse_ville), ' ', '')
  address = concatIfExist(address, infos.adresse_ville, `${Filters.filters.capitalize(infos.adresse_ville)} `, ' ')
  if (infos.adresse_pays && infos.adresse_pays.toLowerCase() !== 'france') {
    address = concatIfExist(address, infos.adresse_pays, Filters.filters.upperCase(infos.adresse_pays), '')
  }

  return address
}

function RNCSConcatAddressRP(infos) {
  let address = concatIfExist('', infos.representant_permanent_adresse_code_postal, infos.representant_permanent_adresse_code_postal, '')
  address = concatIfExist(address, (infos.representant_permanent_adresse_code_postal && infos.representant_permanent_adresse_ville), ' ', '')
  address = concatIfExist(address, infos.representant_permanent_adresse_ville, `${Filters.filters.capitalize(infos.representant_permanent_adresse_ville)} `, ' ')
  if (infos.representant_permanent_adresse_pays && infos.representant_permanent_adresse_pays.toLowerCase() !== 'france') {
    address = concatIfExist(address, infos.representant_permanent_adresse_pays, Filters.filters.upperCase(infos.representant_permanent_adresse_pays), '')
  }

  return address
}

function RNCSConcatAddressDAP(infos) {
  let address = concatIfExist('', infos.dap_adresse_code_postal, infos.dap_adresse_code_postal, '')
  address = concatIfExist(address, (infos.dap_adresse_code_postal && infos.dap_adresse_ville), ', ', '')
  address = concatIfExist(address, infos.dap_adresse_ville, `${Filters.filters.capitalize(infos.dap_adresse_ville)} `, ' ')
  address = concatIfExist(address, infos.dap_adresse_pays, Filters.filters.upperCase(infos.dap_adresse_pays), '')

  return address
}

function collabName (person) {
  return Formating.methods.concatNames(person.conjoint_collab_prenoms, person.conjoint_collab_nom_patronyme)
}

function representName (person) {
  return Formating.methods.concatNames(person.representant_permanent_nom_patronyme, person.representant_permanent_prenoms)
}

String.prototype.capitalize = function() {
  return this.toLowerCase().replace( /(?:^|[^\wà-öø-ÿ])[\wà-öø-ÿ]/g, function (match) {
    return match.toUpperCase();
  })
}

export default {
  methods: {
    nameFromCodeGreffe,
    concatIfExist,
    PrincipaleOrSecondaire,
    RNCSDeviseSentence,
    RNCSLastModification,
    RNCSConcatGreffe,
    RNCSConcatName,
    RNCSConcatAddress,
    RNCSConcatAddressRP,
    RNCSConcatAddressDAP,
    collabName,
    representName
  }
}
