import { Heading, Image, Text, VStack } from "native-base";
import {
	type ImageSourcePropType,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";

export type ProductCardProps = {
	id: string;
	brand: string;
	name: string;
	price: string;
	thumb: ImageSourcePropType;
	image: ImageSourcePropType;
	quantity: number;
	size: number;
	description: string;
};

type Props = TouchableOpacityProps & {
	data: ProductCardProps;
};

export function ProductCard({ data, ...rest }: Props) {
	return (
		<TouchableOpacity {...rest}>
			<VStack
				w={40}
				h={40}
				bgColor="gray.500"
				rounded="md"
				alignItems="center"
				p={2}
				m={2}
			>
				<Image
					source={data.thumb}
					alt="Imagem do produto"
					flex={1}
					resizeMode="cover"
				/>

				<Heading color="white" fontFamily="heading" fontSize="lg" mt={2}>
					{data.name}
				</Heading>

				<Text color="gray.200" fontSize="sm">
					R$ {data.price}
				</Text>
			</VStack>
		</TouchableOpacity>
	);
}
