import { FlatList, StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

  // Container principale
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
    fontFamily: 'Avenir',
  },

  // Sfondi principali
  backgroundLight: {
    backgroundColor: '#F9F9F9', // Sfondo chiaro
  },
  backgroundDark: {
    backgroundColor: '#1A1A1A', // Sfondo scuro
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
    color: '#FF6B35', // Colore accento (es. link)
    fontSize: 16,
    fontWeight: 'bold',
  },
  textScreenTitle: {
    color: '#000', // Testo primario
    fontSize: 35,
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
    marginBottom: 10,
    fontWeight: '900',
  },

  // Bottoni
  buttonPrimary: {
    backgroundColor: '#FF6B35', // Arancione
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

  // Card
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
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

  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    zIndex: 10, // Forza la visibilità sopra altri elementi
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Migliore ombra su Android
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default globalStyles;