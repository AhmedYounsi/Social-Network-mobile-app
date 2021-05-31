import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Col, Row, Grid } from "react-native-easy-grid";

function LikeButton() {
    return (
        <TouchableOpacity onPress={() => LikePost(props.post._id)}>
        <Col
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 1,
          }}
          size={1}
        >
          <View style={styles.likes}>
            <AntDesign
              name="like1"
              size={25}
              color="#909090"
              style={{ marginLeft: 15,marginBottom:2 }}
            />
            <Text style={styles.count}>0</Text>
          </View>
        </Col>
      </TouchableOpacity>
    )
}

export default LikeButton
