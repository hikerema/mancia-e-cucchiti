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

  mapContainer: {
    height: "50%",
    marginTop:20,
    borderRadius:16,
    overflow:'hidden',
  },

  map: {
    height: "100%",
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
    fontSize: 18,
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
    textAlign: 'center',
  },

  AccentContainer: {
    alignContent: 'center',
    alignItems: 'center',
  },

  textScreenTitle: {
    color: '#000', // Replace with a single color or implement gradient differently
    fontSize: 35,
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
    marginBottom: 10,
    fontWeight: '900',
    },

  textNameTitle: {
    color: '#000', // Replace with a single color or implement gradient differently
    fontSize: 35,
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
    marginBottom: 10,
    fontWeight: '900',
    width: '80%',
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
    fontSize: 20,
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

  completeProfileCard: {
    backgroundColor: '#fdfdfd',
    shadowColor: '#e68231',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 25,
    padding: 16,
  },
  completeProfileCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Avenir',
  },
  completeProfileCardText: {
    color: '#333', // Testo secondario
    fontSize: 16,
    fontFamily: 'Avenir',
  },
  completeProfileCardButtonPrimary: {
    backgroundColor: '#e68231', // Arancione
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 16,
  },

  completeProfileButtonText: {
    color: '#FFFFFF', // Testo bianco
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
  },

  inputContainer: {
    backgroundColor: '#fdfdfd',
    shadowColor: '#e68231',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 25,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 5,
  },

  input: {
    height: 40,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: 'Avenir',
  },
  //Errori nella compilazione degli input
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },

  label: {
    color: '#333', // Testo primario
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    paddingHorizontal: 10,
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
    height: 120,
  },
  
  // Testo Card
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'Avenir',
  },
  cardText: {
    color: '#7D7D7D', // Testo secondario
    fontSize: 14,
    fontFamily: 'Avenir',
    marginVertical : 4,
  },
  cardImage: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },

  // Dettagli

  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },

  detailsCard: {
    backgroundColor: '#fdfdfd',
    shadowColor: '#a17b5f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    height: 300,
    borderRadius: 12,
  },

  detailsImage: {
    borderRadius: 12,
    flex: 1,
  },

  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 8,
  },

  detailsText: {
    color: '#7D7D7D', // Testo secondario
    fontSize: 18,
    marginVertical: 4,
  },

  buttonDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 50,
    borderRadius: 100,
    marginBottom: 30, 
  },

  textScreenSubtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    marginVertical: 10,
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
    fontSize: 18,
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

  VoidOrderContainer: {
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
    height: 200,
  },

  VoidOrderText: {
    color: '#bbb',
    fontSize: 19,
    marginTop: 20,
    fontFamily: 'Avenir',
  },

  iconProfile: {
    width: 55,
    height: 55,
    borderRadius: 100,
    backgroundColor: '#e68231', 
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },

  iconProfileText: {
    color: '#333',
    fontSize: 30,
    fontWeight: 'bold',
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