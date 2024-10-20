import numpy as np 
import matplotlib.pyplot as plt
from scipy.linalg import sqrtm
from numpy.linalg import eig
import scipy
import math
from numpy.linalg import det

## Génération d'une variable aléatoire gaussienne

def gen_gauss(N):
    vect_gauss=2*np.random.randn(N)+3 
    return vect_gauss

def moy(data):
    return data.mean()
def var(data):
    return data.var()


#plt.plot([i for i in range(1,1000)],[moy(gen_gauss(i)) for i in range(1,1000)])
#plt.plot([i for i in range(1,1000)],[var(gen_gauss(i)) for i in range(1,1000)])
#plt.show()

## Génération de vecteurs aléatoires gaussiens 

# 1)

N=100
m=[4,9]
s=np.array([[1,0],[0,np.sqrt(6)]])

def gauss_rand_partiel(n,m):
    return np.random.randn(2,n)+ np.array([[m[0] for _ in range(n)],[m[1] for _ in range(n)]])

q1 = gauss_rand_partiel(N,m)

print(q1)

# 2)

def gauss_rand_full(n,m,s):
    c=np.dot(s,np.random.randn(2,n))+ np.array([[m[0] for _ in range(n)],[m[1] for _ in range(n)]])
    moy=np.mean(c,axis=1)
    print("la moyenne est impirique est de " + str(moy) )
    print("la variance est de " + str(np.cov(c)))
    print(c)
    return c

q2 = gauss_rand_full(N,m,s)

# 3) En prenant Sigma = R (R transposée) alors U=R convient

# 4) 

s2 = sqrtm((np.array([[2,2],[2,5]])))
m2 =[0,0]

q4 = gauss_rand_full(N,m2,s2)

#On a tg(2*alpha)=2*S_12/(S_11 - S_22) 
#d'où alpha = (1/2)*tan^-1(2*S_12/(S_11 - S_22))

alpha = (1/2)*math.atan(2*2/(2 - 5))%(2*math.pi)
print("L'orientation de l'ellipsoïde de Mahalanobis est de : " +str(alpha) + " en radian")

V = np.array([[math.cos(alpha), -math.sin(alpha)],[math.sin(alpha), math.cos(alpha)]])
vp = np.linalg.eigvals(np.dot(s2,s2))

s2_ = np.dot(np.dot(V,np.diag([vp[0],vp[1]])),np.transpose(V))

print(s2_)

#Ainsi on retrouve que la formule fonctionne bien 



# 5)

m_1= [4,9]
m_2= [8.5,7.5]
m_3= [6,3.5]

s_1=sqrtm(np.array([[2,2],[2,5]]))
s_2=sqrtm(np.array([[2,-2],[-2,5]]))
s_3=sqrtm(np.array([[7,-4],[-4,7]]))

x1=gauss_rand_full(N,m_1,s_1)
x2=gauss_rand_full(N,m_2,s_2)
x3=gauss_rand_full(N,m_3,s_3)

plt.scatter(x1[0], x1[1], color='red', label='Class 1')
plt.scatter(x2[0], x2[1], color='blue', label='Class 2')
plt.scatter(x3[0], x3[1], color='green', label='Class 3')

plt.xlabel('X1')
plt.ylabel('X2')
plt.legend()
plt.show()



### Courbes d'équidensité


# 1)
x_i = np.linspace(0.27,12.5, 57)
y_j = np.linspace(-2,15, 57)

X_grid, Y_grid = np.meshgrid(x_i, y_j)

plt.figure()
plt.scatter(X_grid, Y_grid, color='blue', s=5)
plt.title('Grille de points')
plt.show()


# 2)
m_1 = np.array([4, 9])
s_1 = sqrtm(np.array([[2, 2], [2, 5]]))
dens1 = np.zeros((57, 57))
for i in range(57):
    for j in range(57):
        point = np.array([X_grid[i, j], Y_grid[i, j]])
        diff = point - m_1
        exponent = -0.5 * np.dot(np.dot(diff.T, np.linalg.inv(s_1)), diff)
        dens1[i, j] = (1 / (2 * np.pi * np.sqrt(np.linalg.det(s_1)))) * np.exp(exponent)

print(dens1)
#3)

plt.figure()
plt.contour(X_grid, Y_grid, dens1.T)
plt.title('Courbes d\'équidensité pour la classe 1')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()

#4) 

##Pour la classe 2

m_2 = np.array([8.5,7.5])
s_2 = sqrtm(np.array([[2,-2],[-2,5]]))
dens2 = np.zeros((57, 57))
for i in range(57):
    for j in range(57):
        point = np.array([X_grid[i, j], Y_grid[i, j]])
        diff = point - m_2
        exponent = -0.5 * np.dot(np.dot(diff.T, np.linalg.inv(s_2)), diff)
        dens2[i, j] = (1 / (2 * np.pi * np.sqrt(np.linalg.det(s_1)))) * np.exp(exponent)

##Pour la classe 3
        
m_3 = np.array([6,3.5])
s_3 = sqrtm(np.array([[7,-4],[-4,7]]))
dens3 = np.zeros((57, 57))
for i in range(57):
    for j in range(57):
        point = np.array([X_grid[i, j], Y_grid[i, j]])
        diff = point - m_3
        exponent = -0.5 * np.dot(np.dot(diff.T, np.linalg.inv(s_3)), diff)
        dens3[i, j] = (1 / (2 * np.pi * np.sqrt(np.linalg.det(s_3)))) * np.exp(exponent)

plt.figure()
plt.contour(X_grid, Y_grid, dens1.T)
plt.contour(X_grid, Y_grid, dens2.T)
plt.contour(X_grid, Y_grid, dens3.T)
plt.title('Courbes d\'équidensité pour la classe 1,2 & 3')
plt.xlabel('X')
plt.ylabel('Y')
plt.show()


##Ne pas oublier de répondre à l'amplitude maximale


####Partie 5

#1)
