import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

  // Container principale
  container: {
    flex: 1,
    fontFamily: 'Avenir',
  },

  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
    fontFamily: 'Avenir',
  },

  // Sfondi principali
  backgroundLight: {
    backgroundColor: '#fff', // Sfondo chiaro
  },
  backgroundDark: {
    backgroundColor: '#1A1A1A', // Sfondo scuro
  },
  backgroundOrange: {
    backgroundColor: '#e68231', // Arancione
  },
  
  // Colori di testo
  textPrimary: {
    color: '#333333', // Testo primario
    fontSize: 16,
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
  },
  textSecondary: {
    color: '#7D7D7D', // Testo secondario
    fontSize: 14,
    fontFamily: 'System',
  },
  textAccent: {
    color: '#e4953b', // Colore accento (es. link)
    fontSize: 16,
    fontWeight: 'bold',
  },
  textScreenTitle: {
    color: '#000', // Replace with a single color or implement gradient differently
    fontSize: 35,
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
    marginBottom: 10,
    fontWeight: '900',
  },

  // Bottoni
  buttonPrimary: {
    backgroundColor: '#e68231', // Arancione
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: '#FFFFFF', // Testo bianco
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
  },
  buttonSecondary: {
    borderColor: '#004AAD', // Blu outline
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: '#004AAD', // Testo blu
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    paddingRight: 10,
  },
  backButtonIcon: {
    width: 22,
    height: 22,
  },

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#fdfdfd',
    borderRadius: 12,
    shadowColor: '#a17b5f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    marginVertical: 10,
    marginHorizontal: 5,
    height: 110,
  },
  
  // Testo Card
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Avenir',
  },
  cardText: {
    color: '#7D7D7D', // Testo secondario
    fontSize: 14,
    fontFamily: 'Avenir',
    marginVertical : 4,
  },
  cardImage: {
    width: 110,
    height: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#999',
  },

  // Stati
  success: {
    color: '#4CAF50', // Verde
    fontWeight: 'bold',
  },
  error: {
    color: '#F44336', // Rosso
    fontWeight: 'bold',
  },
  warning: {
    color: '#FFC107', // Giallo
    fontWeight: 'bold',
  },

  // Spaziature
  marginVerticalSmall: {
    marginVertical: 8,
  },
  marginVerticalMedium: {
    marginVertical: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },

  // Icon Container
  iconContainer: {
    backgroundColor: '#E6F1FF', // Sfondo hover per icone
    borderRadius: 50,
    padding: 10,
  },

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff', 
    paddingBottom: 20,
    paddingTop: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 0.3,
    height: 80,
  },
  navTextActive: {
    color: '333',
    fontSize: 12,
    fontWeight: 'regular',
  },

  navText: {
    color: '#aaaaaa', // agagagagagagag
    fontSize: 12,
    fontWeight: 'regular',
  },

  navButton: {
    alignItems: 'center',
  },

  navIcon: {
    width: 24,
    height: 24,
  },


});

export default globalStyles;