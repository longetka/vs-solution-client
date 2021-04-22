import React 			from 'react';
import Form 			from '../components/Form/Form';
import Header 			from '../components/header/Header';
import Slider 			from '../components/Form/components/Slider/Slider';
import TextInput 		from '../components/Form/components/TextInput/TextInput';
import TextArea 		from '../components/Form/components/TextArea/TextArea';
import SocialSubtitle 	from '../components/Form/components/TextInput/SocialSubtitle';
import ButtonSubmit 	from '../components/buttons/ButtonSubmit';
import Footer 			from '../components/Footer/Footer';
import ButtonChoise 	from '../components/buttons/ButtonChoise';
import { submitData } 	from '../hooks/submit.hook';
import { Modal } 		from '../components/Form/components/Modal/Modal';
import './formImages.scss';

class BrawlStars extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			modalActive: false,
			userData: JSON.parse(localStorage.getItem('userData'))
		}
		this.submitBrawl = this.submitBrawl.bind(this);
	}
	
	async submitBrawl(event) {
		const data = {
			gameName: 'Brawl Stars',
			userId: this.state.userData.userId,
			name: this.state.userData.name,
			legendPerson: event.target[0].value,
			cupNumber: event.target[1].value,
			skins: event.target[2].value,
			price: event.target[3].value,
			contacts: event.target[4].value
		}
		event.preventDefault();
		submitData('https://vs-solution-test.herokuapp.com/sell/account/brawl', data);
		this.setState({modalActive: true});
		setTimeout(() => window.scrollTo(0, 0), 100);
	}
	render() {
		return(
			<div>
				<Header 
					page="brawl"
					offer="Продай аккаунт в Brawl Stars по выгодной стоимости" 
					img="images/hero-brawl.png"
					blockClass="brawl"
				>
					<ButtonChoise 
						btnName="choise"
						href="#form"
						text="Продать аккаунт"
					/>
				</Header>
				<Form submitHandler={this.submitBrawl} id="form">
					<Modal active={this.state.modalActive} />
					<img src="images/pics/brawl/brawl-box1.png" alt="" className="brawl-box1" />
					<img src="images/pics/brawl/brawl-box2.png" alt="" className="brawl-box2" />
					<img src="images/pics/brawl/brawl-box3.png" alt="" className="brawl-box3" />
					<Slider 
						title="Сколько на Вашем аккаунте легендарных персонажей?"
						name="legendPerson"
						max="10"
						min="0"
						step="1"
					/>
					<TextInput 
						title="Сколько кубков на Вашем аккаунте?"
						placeholder="Например: 10 000"
						name="cupNumber"
						type="number"
						required
					/>
					<TextArea 
						title="Какие скины есть на Вашем аккаунте?"
						placeholder="Напишите название скинов через запятую"
						name="skins"
						required
					/>
					<Slider 
						title="Укажите цену за которую Вы хотите продать свой аккаунт"
						name="price"
						max="300000"
						min="100"
						step="100"
					/>
					<TextInput 
						title="Укажите контактную информацию"
						placeholder="Например: xxxxxxx@gmail.com"
						name="contacts"
						required
					>
						<SocialSubtitle text="@Telegram , VK , Номер тел. , Эл. почта и т.д."/>
					</TextInput>
					<ButtonSubmit />
				</Form>
				<Footer />
			</div>
		)
	}
};

export default BrawlStars;