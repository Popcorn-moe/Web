import VNavigationDrawer from 'vuetify/src/components/navigation-drawer/VNavigationDrawer'
import VBtn from 'vuetify/src/components/buttons/VBtn'
import VTextField from 'vuetify/src/components/text-fields/VTextField'
import VDialog from 'vuetify/src/components/dialogs'
import VCard from 'vuetify/src/components/cards'
import VSelect from 'vuetify/src/components/selects/VSelect'
import VCheckbox from 'vuetify/src/components/selection-controls/VCheckbox'
import VSwitch from 'vuetify/src/components/selection-controls/VSwitch'
import VIcon from 'vuetify/src/components/icons/VIcon'
import VDivider from 'vuetify/src/components/dividers/VDivider'
import VApp from 'vuetify/src/components/app/VApp'
import VExpansionPanel from 'vuetify/src/components/expansion-panel/VExpansionPanel'
import VExpansionPanelContent from 'vuetify/src/components/expansion-panel/VExpansionPanelContent'
import VDatePicker from 'vuetify/src/components/pickers/VDatePicker'
import VMenu from 'vuetify/src/components/menus/VMenu'
import VChip from 'vuetify/src/components/chips/VChip'
import { VTabReverseTransition, VTabTransition } from 'vuetify/src/components/transitions'
import VProgressCircular from 'vuetify/src/components/progress/VProgressCircular'
import Cards from 'vuetify/src/components/cards'

VTextField.components = {
    VIcon
}

VChip.components = {
  VIcon
}

VDatePicker.components = {
    VTabReverseTransition,
    VTabTransition,
    VIcon,
    VBtn,
    ...Cards
}

VBtn.components = {
    VProgressCircular
}

export {
  VNavigationDrawer,
  VBtn,
  VTextField,
  VSelect,
  VCheckbox,
  VSwitch,
  VIcon,
  VDivider,
  VApp,
  VExpansionPanel,
  VExpansionPanelContent,
  VDialog,
  VCard,
  VDatePicker,
  VMenu,
  VChip
}
