import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

  // Container principale
  container: {
    flex: 1,
    padding: 25,
    marginTop: 20,
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
    color: '#333333', // Testo primario
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Avenir', // Sostituisci con il font scelto se diverso
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Per Android
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
});

export default globalStyles;