import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

// ─────────────────────────────────────────
// SCREEN WIDTH
// ─────────────────────────────────────────
const screenWidth =
  Dimensions.get('window').width;

// ─────────────────────────────────────────
// CARD WIDTH
// 2 CARDS POR FILA
// ─────────────────────────────────────────
const CARD_WIDTH =
  (screenWidth / 2) - 24;

export default function MovieCard({

  movie,

  role,

  onEdit,

  onDelete,

}: any) {

  return (

    <View style={styles.card}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.player}>
          ◄ P1 ►
        </Text>

        <View style={styles.square} />

        <Text style={styles.status}>
          READY
        </Text>

      </View>

      {/* IMAGE */}
      <Image
        source={{ uri: movie.image }}
        style={styles.image}
      />

      {/* TITLE */}
      <Text
        numberOfLines={2}
        style={styles.title}
      >
        {movie.title}
      </Text>

      {/* LINE */}
      <View style={styles.line} />

      {/* GENRE */}
      <Text
        numberOfLines={1}
        style={styles.genre}
      >
        ■ {movie.genre}
      </Text>

      {/* PRICE */}
      <Text style={styles.price}>
        ▶ ${movie.price}
      </Text>

      {/* DESCRIPTION */}
      <Text
        numberOfLines={3}
        style={styles.description}
      >
        {movie.description}
      </Text>

      {/* FOOTER */}
      <View style={styles.footer}>

        <Text style={styles.footerText}>
          ACCESS
        </Text>

        <Text style={styles.footerText}>
          LOADING...
        </Text>

      </View>

      {/* BUTTONS */}
      {role === 'admin' && (

        <View style={styles.buttonContainer}>

          {/* EDIT */}
          <TouchableOpacity

            activeOpacity={0.8}

            style={styles.editButton}

            onPress={onEdit}
          >

            <Text style={styles.buttonText}>
              EDIT
            </Text>

          </TouchableOpacity>

          {/* DELETE */}
          <TouchableOpacity

            activeOpacity={0.8}

            style={styles.deleteButton}

            onPress={onDelete}
          >

            <Text style={styles.buttonText}>
              DEL
            </Text>

          </TouchableOpacity>

        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  // ───────────────────────────────────────
  // CARD
  // ───────────────────────────────────────
  card: {

    width: CARD_WIDTH,

    backgroundColor: '#2E0246',

    borderWidth: 4,

    borderColor: '#A406F9',

    padding: 10,

    marginBottom: 18,

    marginHorizontal: 6,

    shadowColor: '#000',

    shadowOffset: {
      width: 6,
      height: 6,
    },

    shadowOpacity: 1,

    shadowRadius: 0,

    elevation: 12,
  },

  // ───────────────────────────────────────
  // HEADER
  // ───────────────────────────────────────
  header: {

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

    marginBottom: 8,
  },

  player: {

    color: '#C560FB',

    fontSize: 7,

    fontWeight: '900',

    letterSpacing: 2,
  },

  square: {

    width: 10,

    height: 10,

    backgroundColor: '#22c55e',

    borderWidth: 2,

    borderColor: '#000',
  },

  status: {

    color: '#22c55e',

    fontSize: 7,

    fontWeight: '900',

    letterSpacing: 2,
  },

  // ───────────────────────────────────────
  // IMAGE
  // ───────────────────────────────────────
  image: {

    width: '100%',

    height: 160,

    borderWidth: 4,

    borderColor: '#69049F',

    marginBottom: 10,
  },

  // ───────────────────────────────────────
  // TITLE
  // ───────────────────────────────────────
  title: {

    color: '#F6E6FE',

    fontSize: 11,

    fontWeight: '900',

    letterSpacing: 2,

    textTransform: 'uppercase',

    minHeight: 38,

    textShadowColor: '#000',

    textShadowOffset: {
      width: 3,
      height: 3,
    },

    textShadowRadius: 0,
  },

  // ───────────────────────────────────────
  // LINE
  // ───────────────────────────────────────
  line: {

    width: '100%',

    height: 2,

    backgroundColor: '#69049F',

    marginVertical: 8,
  },

  // ───────────────────────────────────────
  // GENRE
  // ───────────────────────────────────────
  genre: {

    color: '#C560FB',

    fontSize: 8,

    fontWeight: '900',

    letterSpacing: 2,

    textTransform: 'uppercase',

    marginBottom: 8,
  },

  // ───────────────────────────────────────
  // PRICE
  // ───────────────────────────────────────
  price: {

    color: '#22c55e',

    fontSize: 10,

    fontWeight: '900',

    letterSpacing: 2,

    textTransform: 'uppercase',

    marginBottom: 10,

    textShadowColor: '#000',

    textShadowOffset: {
      width: 2,
      height: 2,
    },

    textShadowRadius: 0,
  },

  // ───────────────────────────────────────
  // DESCRIPTION
  // ───────────────────────────────────────
  description: {

    color: '#F6E6FE',

    fontSize: 8,

    lineHeight: 16,

    letterSpacing: 1,

    fontWeight: '700',

    textTransform: 'uppercase',

    minHeight: 52,
  },

  // ───────────────────────────────────────
  // FOOTER
  // ───────────────────────────────────────
  footer: {

    marginTop: 12,

    borderTopWidth: 2,

    borderTopColor: '#69049F',

    paddingTop: 8,
  },

  footerText: {

    color: '#A406F9',

    fontSize: 7,

    fontWeight: '900',

    letterSpacing: 2,

    marginBottom: 4,
  },

  // ───────────────────────────────────────
  // BUTTON CONTAINER
  // ───────────────────────────────────────
  buttonContainer: {

    flexDirection: 'row',

    marginTop: 14,
  },

  // ───────────────────────────────────────
  // EDIT BUTTON
  // ───────────────────────────────────────
  editButton: {

    flex: 1,

    backgroundColor: '#A406F9',

    borderWidth: 3,

    borderColor: '#000',

    paddingVertical: 10,

    marginRight: 6,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOffset: {
      width: 4,
      height: 4,
    },

    shadowOpacity: 1,

    shadowRadius: 0,

    elevation: 8,
  },

  // ───────────────────────────────────────
  // DELETE BUTTON
  // ───────────────────────────────────────
  deleteButton: {

    flex: 1,

    backgroundColor: '#69049F',

    borderWidth: 3,

    borderColor: '#000',

    paddingVertical: 10,

    alignItems: 'center',

    shadowColor: '#000',

    shadowOffset: {
      width: 4,
      height: 4,
    },

    shadowOpacity: 1,

    shadowRadius: 0,

    elevation: 8,
  },

  // ───────────────────────────────────────
  // BUTTON TEXT
  // ───────────────────────────────────────
  buttonText: {

    color: '#F6E6FE',

    fontSize: 7,

    fontWeight: '900',

    letterSpacing: 2,

    textTransform: 'uppercase',

    textShadowColor: '#000',

    textShadowOffset: {
      width: 2,
      height: 2,
    },

    textShadowRadius: 0,
  },
});