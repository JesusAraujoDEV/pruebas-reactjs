import { useState } from 'react'
import Card from './components/card'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const items = ['React', 'Typescript', 'Vite']

  return (
    <section>
      <h1>Hola Mundo!</h1>
      <Card title='Monkey D. Luffy' description='Capitán de los Piratas de Sombrero de Paja' image='data:image/webp;base64,UklGRvwFAABXRUJQVlA4IPAFAADQGwCdASqbAFsAPyliymUuOa4uE3MwJQlmAMK0Ws9BoxLHK/pr3ClgOvoeLJ9pf8bxvEED03gzpp56fwjfxh2ENBsZ0BAusoJJ/t2l/xuhRz06fQe3PyW8lJwC4UItABFZZCa5XWHo+iGsY1I2mx4LVFZnYLNy8jNWLZUNh6k9udS2TZp7/r7PQzZlYg14JBs3UXszRCo+O/uhZUOcmL6I6QBMVa2usBalnE7NBUApMIg7imLX7VBjjPfD0lBUqDVzTTpD0Up3sN1kzqtXKK/kyNBcG/m7drtprLdI51ww5a77FPtHxAAA/q78DeM9T6yHLUJAvc+Uaf0Fi0gkobBr35cf8Q2vLf881PcZN5no+k8j8Asv27R15O7jBJiSEbVFoC7jsFdVXRS3G8vY0CWMdqcMyIL0/p+f7/N3egxB6CMRHuLAXUX5djxBYb93kMdjrmkH4GQ/ekwJzdLsO0mxjyH21G/i9sRzZ6VqxeGW5Nd64OR8CAW1zDYdyuR5dJt387umltonENUSeyi/oa+OjNN4DbMdsgBsk/dGhjtDgn6MDX4799pDZYWoIQtOCBh0geE9oh5x+OjCr7Vclx7acCaA+UNQssrweGOmtD2qEeS8ztgfdNZ5q3uA0bXOJtPOyjeCtgm+6CSZQdJwyGz6eTYHhxF3y8IOIXDCXWUKbpiuMWcAlydgg0mfUVo9u7IJYP1E5+cBlErvb4HLfBwVhpseEqT2Dq790I3Fm4fyjj5CAr+Pqy+X1tYHz7L2hGNsA3LXOMDdfD9snGXWOMAX3h6gyXl1L0U+XOQi5T4zXVqwRdx0sPgBZ5U46JPwEadnovitizK/SZvEAN4xFoaXz+6cWocWr6S5Vp00D/ul5yRJl8Rjd5tiT1FHiEjCKB/RpGZKfVNI++GxSNGKtztilp1sbCdhcKFMg9mCEz3dJstZkdzniOJlj0DuSKZf0X92x1uZ1+fwrb0rnGgAcF1bKr0B5qasbuK05ilrM9vyY19Q+dQkfxZ+Sc1SRat4U5SjzkUUPZk05ZA44sjIzhyTD2e47DVmXNRAyZBG+7G0Gtocs2BuOPgyjlSIrvHL8rGNEKPIuT1OFsl9JvuHibZvyxFTYVWUlMgtYclWSRV03713U81t9Icg7M3jdaD8hgdYYAHtKJbfh1WcmmKurevhNcSmPboAEHUfeZ+zVgk49bdm7NxZTRZMo1WZ1QFp4xyuoHdHddv0U4kY//C0VwRLYrrM4c37trsTf031eDTEnqC3kb8S1mVI/xZT77WYeLwp0XtyPtXlaKysnExaxkZMBZ054BUodo1K4CitSUQE5m/hke80kn4qrOVulYuaH4p/1apLm5MZTVCA2XRw2yKE1QlV+wo+Td4T8MEwztfmGoOAF8MxVbMcZrS0uPjMCqruaKt9VbxnjA89HBLSEl8bjLXpoZX0fqXcVWYkJN9/fZ3jPLjmYRbATb3Nuz1zNSpFqQJlOg9SLFVJqmCXMrsQ9Ch3+MyAtZIMHU5/ewzVyTxaiFeWd9Ma5cnIW/tAHjHuY9fN/mdigjOlqfI1T5dQGJGkvJ3foZv49Gz0ZSIp3P1tzXXhQYL5VLCmWFXgzzOUKHlRCnlFs5aoLPmADaQYtj0mm6fkY5sh7riTfECuBIbUwrxwfBtl3vmIlkgzrdIAX0fAee+j4unhxhCWz8yLOIj4oLUDzzapM4tjuvNaS7I1cYMt8FPu63me8+YZtGGXpf0n+ronOgoToRfcfFvN7YYm2MaC605RbWmBjaTcZoBqEx1xFnLXWW4K+9qSQsTbiDYlAShEkkGvk84DYzLHG++bl+b2By+jucvW/T/CpYaiVbGHKl56J9H2eZGmGZDglcr+CMo6S5d4EkVuRA0EAJpDWWEBqHVmz8u3gpIs4zvu8KSBFIUrFGqq7afuRtZgr5E0G+5TibS6SRQCSxM7QH3Nh1TTCMCWAt3xqj0T7cy3Kdmoe2qkyNgNmc8BPBg/vFJ0A8IZxghbPAK/ZjXfYokyEoHI/blLNYpnJaAAAA=='/>
      <Card title='Monkey D. Luffy' description='Capitán de los Piratas de Sombrero de Paja' image='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQjnfLcZMdgvVr9-NVq3CjFfEr1LimBF1u92bKXwP9DjesRiO9McZOSIYIsw0DyR8uqEaS2N-9HCiQ2DudCGkGwNgHBBwX9RCxozj6aqPyj'/>
      <ul>
        {
          items.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
    </section>
  )
}

export default App
